import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonCardComponent } from '../../../../shared/components/common-card/common-card.component';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-category-card',
  standalone:true,
  imports: [CommonCardComponent,CommonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {
  @Input() category!: Category;
  @Input() active = false;
  @Input() dimmed = false;

  @Output() select = new EventEmitter<Category>();
  @Input() menuOpen = false;
  @Input() isActive = true;

  @Output() toggleMenu = new EventEmitter<void>();
  @Output() delete = new EventEmitter<Category>();


  onClick() {
    this.select.emit(this.category);
  }

  menuItems: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => this.handleAction('edit')
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => this.handleAction('delete')
    },
    {
      label: 'Add activities',
      icon: 'pi pi-plus',
      command: () => this.handleAction('add')
    }
  ];

  handleAction(action: string) {
    if (action === 'edit') {
      console.log('✏️ Editar:', this.category);
      // Aquí iría el modo edición
    } else if (action === 'delete') {
      console.log('🗑 Eliminar:', this.category);
      this.delete.emit(this.category); // <- Emitir al padre
    }else if (action === 'add') {
      console.log(' Add activities to this category:', this.category);
    }
  }
}
