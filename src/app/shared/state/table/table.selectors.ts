import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TableStateMap } from './table-state.model';

export const selectTableFeature = createFeatureSelector<TableStateMap>('tables');

export const selectTableById = (tableId: string) =>
  createSelector(selectTableFeature, (state) => state[tableId]);


/*import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TablesState } from './table-state.model';

export const selectTablesState = createFeatureSelector<TablesState>('tables');

export const selectTableState = (tableId: string) =>
  createSelector(selectTablesState, (state) => state[tableId]);

export const selectTableData = (tableId: string) =>
  createSelector(selectTableState(tableId), (state) => state?.data ?? []);

export const selectTableLoading = (tableId: string) =>
  createSelector(selectTableState(tableId), (state) => state?.loading ?? false);

export const selectTotalRecords = (tableId: string) =>
  createSelector(selectTableState(tableId), (state) => state?.totalRecords ?? 0);
*/
