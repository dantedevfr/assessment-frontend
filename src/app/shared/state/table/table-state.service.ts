/*import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setTableState, resetTableState } from './table.actions';
import { selectTableState } from './table.selectors';
import { Observable } from 'rxjs';
import { TableState } from './table-state.model';

@Injectable({ providedIn: 'root' })
export class TableStateService {
  constructor(private store: Store) {}

  getState$(tableId: string): Observable<TableState | undefined> {
    return this.store.select(selectTableState(tableId));
  }

  setState(tableId: string, partial: Partial<TableState>) {
    this.store.dispatch(setTableState({ tableId, state: partial }));
  }

  reset(tableId: string) {
    this.store.dispatch(resetTableState({ tableId }));
  }
}*/
