import { createReducer, on } from '@ngrx/store';
import { CategoryState } from './category-state.model';

import * as CategoryActions from './categories.actions';

const initialState: CategoryState = {
  categoryLevels: [],
  selectedCategories: [],
  allCategories: []
};

export const categoriesReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategoryLevels, (state, { levels }) => ({
    ...state,
    categoryLevels: levels,
  })),
  on(CategoryActions.setSelectedCategories, (state, { selected }) => ({
    ...state,
    selectedCategories: selected,
  })),
  on(CategoryActions.resetCategories, () => initialState),
  on(CategoryActions.loadAllCategoriesSuccess, (state, { categories }) => ({
    ...state,
    allCategories: categories
  }))
);
