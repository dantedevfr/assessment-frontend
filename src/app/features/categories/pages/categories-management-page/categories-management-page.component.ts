import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryColumnComponent } from './../../components/category-column/category-column.component';
import { Category } from '../../models/category.model';
import { ApiClientService } from '../../../../core/services/api-client.service';
import { CommonConfirmDialogComponent } from '../../../../shared/components/common-confirm-dialog/common-confirm-dialog.component';
import { NotificationService } from '../../../../core/services/notification.service';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';

import { Store } from '@ngrx/store';
import * as CategoryActions from '../../state/categories.actions';
import * as CategorySelectors from '../../state/categories.selectors';

@Component({
  selector: 'app-categories-management-page',
  standalone: true,
  imports: [
    CategoryColumnComponent,
    CommonModule,
    CommonConfirmDialogComponent,
    CategoryFormComponent,
  ],
  templateUrl: './categories-management-page.component.html',
  styleUrl: './categories-management-page.component.scss',
})
export class CategoriesManagementPageComponent {
  @ViewChild('confirmDialog') confirmDialog!: CommonConfirmDialogComponent;
  @ViewChild('categoryFormModal') categoryFormModal!: CategoryFormComponent;

  private api = inject(ApiClientService);
  private store = inject(Store);
  private readonly endpoint = 'categories';

  categoryLevels = signal<Category[][]>([]);
  selectedCategories = signal<(Category | null)[]>([]);

  modalVisible = signal(false);
  modalEditing = signal<Category | null>(null);
  modalParentId = signal<number | null>(null);
  modalParentName = signal<string | null>(null);
  categoryToDelete = signal<Category | null>(null);

  constructor(private notification: NotificationService) {
    this.store.select(CategorySelectors.selectCategoryLevels).subscribe(levels => {
      this.categoryLevels.set(levels);

      // Solo cargamos si no hay datos
      if (!levels || levels.length === 0) {
        this.loadRootCategories();
      }
    });

    this.store.select(CategorySelectors.selectSelectedCategories).subscribe(selected => {
      this.selectedCategories.set(selected);
    });
  }

  loadRootCategories() {
    this.api.getAll<Category>(this.endpoint).subscribe((data) => {
      const roots = data.filter((c) => !c.id_parent_category);
      this.store.dispatch(CategoryActions.loadCategoryLevels({ levels: [roots] }));
      this.store.dispatch(CategoryActions.setSelectedCategories({ selected: [] }));
    });
  }

  loadSubcategories(parent: Category, levelIndex: number) {
    this.api.getAll<Category>(this.endpoint).subscribe((data) => {
      const children = data.filter((c) => c.id_parent_category === parent.id);
      const updatedLevels = this.categoryLevels().slice(0, levelIndex + 1);
      const updatedSelected = this.selectedCategories().slice(0, levelIndex);

      this.store.dispatch(CategoryActions.loadCategoryLevels({
        levels: [...updatedLevels, children]
      }));
      this.store.dispatch(CategoryActions.setSelectedCategories({
        selected: [...updatedSelected, parent]
      }));
    });
  }

  getColumnTitle(index: number): string {
    if (index === 0) return 'Categoría raíz';
    const selected = this.selectedCategories()[index - 1];
    return selected?.name ?? 'Categoría';
  }

  confirmDelete(category: Category) {
    this.categoryToDelete.set(category);
    this.confirmDialog.show();
  }
  handleConfirmedDelete() {
    const category = this.categoryToDelete();

    if (!category?.id) return;

    this.api.delete(this.endpoint, category.id).subscribe({
      next: () => {
        this.notification.showSuccess('Categoría eliminada con éxito');
        const parentId = category.id_parent_category ?? null;
        this.cleanupAfterDelete(category.id);
        this.reloadParentLevel(parentId);
        this.categoryToDelete.set(null);
      },
      error: () => {
        // Error visual ya lo maneja tu interceptor
      }
    });
  }

  openAddModal(level: number) {
    const parent = this.selectedCategories()[level - 1] || null;
    this.modalEditing.set(null);
    this.modalParentId.set(parent?.id ?? null);
    this.modalParentName.set(parent?.name ?? null); // 👈
    this.modalVisible.set(true);

    queueMicrotask(() => this.categoryFormModal.resetForm?.());

  }

  openEditModal(category: Category) {
    // Limpieza forzada antes de editar
    queueMicrotask(() => this.categoryFormModal.resetForm?.());

    // Ahora sí, cargar datos
    this.modalEditing.set(category);
    this.modalParentId.set(category.id_parent_category ?? null);
    this.modalParentName.set(null);
    this.modalVisible.set(true);
  }

  handleSubmit(category: Partial<Category>) {
    const isEditing = !!category.id;
    const endpoint = this.endpoint;

    const request$ = isEditing
      ? this.api.put<Category>(endpoint, category, category.id)
      : this.api.post<Category>(endpoint, category);

    request$.subscribe({
      next: (newCategory) => {
        this.modalVisible.set(false);
        this.notification.showSuccess(
          isEditing ? 'Categoría actualizada correctamente' : 'Categoría creada correctamente'
        );

        // Recargar solo el nivel afectado (ver paso 4)
        if (isEditing && category.id) {
          this.reloadLevelForCategory(category.id);
        } else {
          this.reloadParentLevel(newCategory.id_parent_category ?? null);
        }
      },
      error: () => {
        // El interceptor ya se encarga de mostrar errores 👍
      }
    });
  }

  reloadLevelForCategory(categoryId: number) {
    this.api.getAll<Category>(this.endpoint).subscribe((data) => {
      const allCategories = data;
      const updatedLevels = [...this.categoryLevels()];

      // encontrar la categoría y su padre
      const category = allCategories.find(c => c.id === categoryId);
      const parentId = category?.id_parent_category ?? null;

      const levelIndex = parentId
        ? this.selectedCategories().findIndex(cat => cat?.id === parentId) + 1
        : 0;

      updatedLevels[levelIndex] = allCategories.filter(c => c.id_parent_category === parentId);
      this.categoryLevels.set(updatedLevels);
    });
  }


  reloadParentLevel(parentId: number | null) {
    this.api.getAll<Category>(this.endpoint).subscribe((data) => {
      const updatedLevels = [...this.categoryLevels()];

      if (!parentId) {
        // es root
        updatedLevels[0] = data.filter(c => !c.id_parent_category);
      } else {
        const levelIndex = this.selectedCategories().findIndex(cat => cat?.id === parentId);
        if (levelIndex >= 0) {
          updatedLevels[levelIndex + 1] = data.filter(c => c.id_parent_category === parentId);
        }
      }

      this.categoryLevels.set(updatedLevels);
    });
  }

  handleCancel() {
    this.modalVisible.set(false);
    this.categoryFormModal.resetForm(); // 👈 limpiar manualmente

  }

  cleanupAfterDelete(categoryId: number) {
    const selected = [...this.selectedCategories()];
    const levels = [...this.categoryLevels()];
    const index = selected.findIndex(c => c?.id === categoryId);

    if (index >= 0) {
      this.store.dispatch(CategoryActions.setSelectedCategories({ selected: selected.slice(0, index) }));
      this.store.dispatch(CategoryActions.loadCategoryLevels({ levels: levels.slice(0, index + 1) }));
    }
  }


}
