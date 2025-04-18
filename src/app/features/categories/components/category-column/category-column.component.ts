import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Category } from '../../models/category.model';
import { CategoryCardComponent } from '../category-card/category-card.component';

@Component({
  selector: 'app-category-column',
  imports: [CommonModule, ButtonModule, CategoryCardComponent],
  templateUrl: './category-column.component.html',
  styleUrl: './category-column.component.scss'
})
export class CategoryColumnComponent {
  @Input() categories: Category[] = [];
  @Input() selectedCategory: Category | null = null;

  @Output() select = new EventEmitter<Category>();
  @Output() add = new EventEmitter<void>();
  @Input() columnTitle: string = 'Categoría';
  @Output() delete = new EventEmitter<Category>();
  @Output() edit = new EventEmitter<Category>();

}
