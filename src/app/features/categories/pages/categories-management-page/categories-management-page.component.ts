import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryColumnComponent } from './../../components/category-column/category-column.component';
import { Category } from '../../models/category.model';
import { ScrollerModule } from 'primeng/scroller';
import { ApiClientService } from '../../../../core/services/api-client.service';
import { CommonConfirmDialogComponent } from '../../../../shared/components/common-confirm-dialog/common-confirm-dialog.component';
import { NotificationService } from '../../../../core/services/notification.service';
@Component({
  selector: 'app-categories-management-page',
  standalone:true,
  imports: [CategoryColumnComponent,CommonModule,CommonConfirmDialogComponent],
  templateUrl: './categories-management-page.component.html',
  styleUrl: './categories-management-page.component.scss'
})
export class CategoriesManagementPageComponent {
  @ViewChild('confirmDialog') confirmDialog!: CommonConfirmDialogComponent;

  private api = inject(ApiClientService);
  private readonly endpoint = 'categories';

  categoryLevels = signal<Category[][]>([]);
  selectedCategories = signal<(Category | null)[]>([]);

  constructor(private notification: NotificationService) {
    this.loadRootCategories();
  }

  loadRootCategories() {
    this.api.getAll<Category>(this.endpoint).subscribe(data => {
      const roots = data.filter(c => !c.id_parent_category);
      this.categoryLevels.set([roots]);
      this.selectedCategories.set([]);
    });
  }

  loadSubcategories(parent: Category, levelIndex: number) {
    this.api.getAll<Category>(this.endpoint).subscribe(data => {
      const children = data.filter(c => c.id_parent_category === parent.id);
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

  openAddModal(level: number) {
    console.log('🟢 Abrir modal para agregar en nivel', level);
  }

  confirmDelete(category: Category) {
    console.log('🗑 Confirmar eliminación de:', category);
    this.confirmDialog.show();
  }
  handleConfirmedDelete() {
    this.notification.showSuccess('Categoría eliminada con éxito');
    // Aquí iría la lógica para hacer DELETE real
  }
}
