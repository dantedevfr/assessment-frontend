import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TableStateMap } from './table-state.model';

export const selectTableFeature = createFeatureSelector<TableStateMap>('tables');

export const selectTableById = (tableId: string) =>
  createSelector(selectTableFeature, (state) => state[tableId]);
