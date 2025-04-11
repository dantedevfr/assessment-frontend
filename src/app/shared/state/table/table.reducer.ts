import { TableAction } from './table.actions';
import { TableStateMap } from './table-state.model';

export function tableReducer(state: TableStateMap, action: TableAction): TableStateMap {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        [action.tableId]: action.initialState,
      };

    case 'UPDATE':
      return {
        ...state,
        [action.tableId]: {
          ...state[action.tableId],
          ...action.changes,
        },
      };

    case 'RESET':
      return {
        ...state,
        [action.tableId]: {
          first: 0,
          rows: 10,
          filters: {},
        },
      };

    default:
      return state;
  }
}

/*import { createReducer, on } from '@ngrx/store';
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
*/
