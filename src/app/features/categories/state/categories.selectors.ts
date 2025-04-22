import { createSelector,createFeatureSelector } from '@ngrx/store';
import { CategoryState } from './category-state.model';

export const selectCategoriesState = createFeatureSelector<CategoryState>('categories');

export const selectCategoryLevels = createSelector(
  selectCategoriesState,
  (state) => state.categoryLevels
);

export const selectSelectedCategories = createSelector(
  selectCategoriesState,
  (state) => state.selectedCategories
);

export const selectAllCategories = createSelector(
  selectCategoriesState,
  (state) => state.allCategories
);
