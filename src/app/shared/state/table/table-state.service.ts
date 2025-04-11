/*import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableStateMap } from './table-state.model';
import { TableAction } from './table.actions';
import { tableReducer } from './table.reducer';

@Injectable({ providedIn: 'root' })
export class TableStateService {
  private state$ = new BehaviorSubject<TableStateMap>({});

  getState(tableId: string) {
    return this.state$.asObservable();
  }

  dispatch(action: TableAction) {
    const current = this.state$.value;
    const next = tableReducer(current, action);
    this.state$.next(next);
  }

  getSnapshot(tableId: string) {
    return this.state$.value[tableId];
  }
}


import { Injectable } from '@angular/core';
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
