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

export const loadAllCategories = createAction('[Categories] Load All');
export const loadAllCategoriesSuccess = createAction(
  '[Categories] Load All Success',
  props<{ categories: Category[] }>()
);

export const resetCategories = createAction('[Categories] Reset');
export const rebuildCategoryLevels = createAction('[Categories] Rebuild Levels');
