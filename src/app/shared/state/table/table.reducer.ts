import { createReducer, on } from '@ngrx/store';
import { TablesState } from './table-state.model';
import { loadTableData, loadTableDataSuccess, loadTableDataFailure } from './table.actions';

const initialState: TablesState = {};

export const tableReducer = createReducer(
  initialState,

  on(loadTableData, (state, { tableId, state: s }) => ({
    ...state,
    [tableId]: { ...state[tableId], ...s, loading: true }
  })),

  on(loadTableDataSuccess, (state, { tableId, data, totalRecords, state: s }) => ({
    ...state,
    [tableId]: { ...s, data, totalRecords, loading: false }
  })),

  on(loadTableDataFailure, (state, { tableId }) => ({
    ...state,
    [tableId]: { ...state[tableId], data: [], loading: false }
  }))
);
