import { createAction, props } from '@ngrx/store';
import { Category } from '../models/category.model';

export const loadCategoryLevels = createAction(
  '[Categories] Load Category Levels',
  props<{ levels: Category[][] }>()
);

export const setSelectedCategories = createAction(
  '[Categories] Set Selected Categories',
  props<{ selected: (Category | null)[] }>()
);

export const resetCategories = createAction('[Categories] Reset');
