import { createReducer, on } from '@ngrx/store';
import { TableStateMap } from './table-state.model';
import { TableActions } from './table.actions';
import { getDefaultTableState } from './table.utils';

export const initialState: TableStateMap = {};

export const tableReducer = createReducer(
  initialState,
  on(TableActions.initTable, (state, { tableId, initialState }) => {
    if (state[tableId]) return state;
    return {
      ...state,
      [tableId]: initialState ?? getDefaultTableState(),
    };
  }),
  on(TableActions.updateTable, (state, { tableId, changes }) => ({
    ...state,
    [tableId]: {
      ...state[tableId],
      ...changes,
    },
  })),
  on(TableActions.resetTable, (state, { tableId, initialState }) => ({
    ...state,
    [tableId]: initialState ?? getDefaultTableState(),
  }))
);
