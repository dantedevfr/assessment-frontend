import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryColumnComponent } from './../../components/category-column/category-column.component';
import { Category } from '../../models/category.model';
import { ApiClientService } from '../../../../core/services/api-client.service';
import { CommonConfirmDialogComponent } from '../../../../shared/components/common-confirm-dialog/common-confirm-dialog.component';
import { NotificationService } from '../../../../core/services/notification.service';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
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
  private readonly endpoint = 'categories';

  categoryLevels = signal<Category[][]>([]);
  selectedCategories = signal<(Category | null)[]>([]);

  modalVisible = signal(false);
  modalEditing = signal<Category | null>(null);
  modalParentId = signal<number | null>(null);

  constructor(private notification: NotificationService) {
    this.loadRootCategories();
  }

  loadRootCategories() {
    this.api.getAll<Category>(this.endpoint).subscribe((data) => {
      const roots = data.filter((c) => !c.id_parent_category);
      this.categoryLevels.set([roots]);
      this.selectedCategories.set([]);
    });
  }

  loadSubcategories(parent: Category, levelIndex: number) {
    this.api.getAll<Category>(this.endpoint).subscribe((data) => {
      const children = data.filter((c) => c.id_parent_category === parent.id);
      const updatedLevels = this.categoryLevels().slice(0, levelIndex + 1);
      this.categoryLevels.set([...updatedLevels, children]);

      const updatedSelected = this.selectedCategories().slice(0, levelIndex);
      this.selectedCategories.set([...updatedSelected, parent]);
    });
  }

  getColumnTitle(index: number): string {
    if (index === 0) return 'Categoría raíz';
    const selected = this.selectedCategories()[index - 1];
    return selected?.name ?? 'Categoría';
  }

  confirmDelete(category: Category) {
    console.log('🗑 Confirmar eliminación de:', category);
    this.confirmDialog.show();
  }
  handleConfirmedDelete() {
    this.notification.showSuccess('Categoría eliminada con éxito');
    // Aquí iría la lógica para hacer DELETE real
  }

  openAddModal(level: number) {
    const parent = this.selectedCategories()[level - 1] || null;
    this.modalEditing.set(null);
    this.modalParentId.set(parent?.id ?? null);
    this.modalVisible.set(true);
  }

  openEditModal(category: Category) {
    this.modalEditing.set(category);
    this.modalParentId.set(category.id_parent_category ?? null);
    this.modalVisible.set(true);
  }

  handleSubmit(category: Partial<Category>) {
    console.log('📤 Guardar categoría:', category);
    this.modalVisible.set(false);
    this.notification.showSuccess('Categoría guardada correctamente');
    // Aquí haces POST o PUT según corresponda
  }

  handleCancel() {
    this.modalVisible.set(false);
  }


}
