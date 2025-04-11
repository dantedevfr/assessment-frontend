import { TableState } from './table-state.model';

export type TableAction =
  | { type: 'INIT'; tableId: string; initialState: TableState }
  | { type: 'UPDATE'; tableId: string; changes: Partial<TableState> }
  | { type: 'RESET'; tableId: string };

/*import { createAction, props } from '@ngrx/store';
import { TableState } from './table-state.model';

export const loadTableData = createAction(
  '[Table] Load Table Data',
  props<{ tableId: string; state: TableState }>()
);

export const loadTableDataSuccess = createAction(
  '[Table] Load Table Data Success',
  props<{ tableId: string; data: any[]; totalRecords: number; state: TableState }>()
);

export const loadTableDataFailure = createAction(
  '[Table] Load Table Data Failure',
  props<{ tableId: string }>()
);*/
