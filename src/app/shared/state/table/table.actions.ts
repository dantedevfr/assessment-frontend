import { createActionGroup, props } from '@ngrx/store';
import { TableState } from './table-state.model';

export const TableActions = createActionGroup({
  source: 'Table',
  events: {
    'Init Table': props<{ tableId: string; initialState?: TableState }>(),
    'Update Table': props<{ tableId: string; changes: Partial<TableState> }>(),
    'Reset Table': props<{ tableId: string; initialState?: TableState }>(),
  },
});
