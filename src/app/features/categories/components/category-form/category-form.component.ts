import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, FormsModule,InputTextModule,TextareaModule],
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent {
  private _category: Category | null = null;

  @Input() visible = false;
  @Input() parentId: number | null = null;

  @Input() set category(value: Category | null) {
    this._category = value;
    this.name = value?.name ?? '';
    this.description = value?.description ?? '';
  }
  get category(): Category | null {
    return this._category;
  }
  @Input() parentCategoryName: string | null = null;

  @Output() submit = new EventEmitter<Partial<Category>>();
  @Output() cancel = new EventEmitter<void>();

  name = '';
  description = '';

  onSubmit() {
    const payload: Partial<Category> = {
      id: this.category?.id,
      name: this.name.trim(),
      description: this.description?.trim(),
      id_parent_category: this.parentId ?? null
    };

    this.submit.emit(payload);
  }
}
