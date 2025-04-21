import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { TableActions } from '../../shared/state/table/table.actions';
import { selectTableById } from '../../shared/state/table/table.selectors';
import { LazyTableLoaderService } from './lazy-table-loader.service';
import { LazyLoadEvent } from 'primeng/api';
import { TableState } from '../../shared/state/table/table-state.model';

@Injectable({ providedIn: 'root' })
export class TableFacadeService {
  private loadingMap = new Map<string, BehaviorSubject<boolean>>();
  private dataMap = new Map<string, BehaviorSubject<any[]>>();
  private totalItemsMap = new Map<string, BehaviorSubject<number>>();

  constructor(
    private store: Store,
    private lazyLoader: LazyTableLoaderService
  ) {}

  init(tableId: string, initialState: any) {
    this.store.dispatch(TableActions.initTable({ tableId, initialState }));
    this.createSubjects(tableId);
  }

  private createSubjects(tableId: string) {
    if (!this.loadingMap.has(tableId)) {
      this.dataMap.set(tableId, new BehaviorSubject<any[]>([]));
      this.loadingMap.set(tableId, new BehaviorSubject<boolean>(false));
      this.totalItemsMap.set(tableId, new BehaviorSubject<number>(0));
    }
  }

  getLoading$(tableId: string): Observable<boolean> {
    return this.loadingMap.get(tableId)?.asObservable() ?? of(false);
  }

  getData$(tableId: string): Observable<any[]> {
    return this.dataMap.get(tableId)?.asObservable() ?? of([]);
  }

  getTotalItems$(tableId: string): Observable<number> {
    return this.totalItemsMap.get(tableId)?.asObservable() ?? of(0);
  }

  getState$(tableId: string): Observable<any> {
    return this.store.select(selectTableById(tableId));
  }

  loadData(tableId: string, endpoint: string, event: LazyLoadEvent) {
    this.createSubjects(tableId); // ❗IMPORTANTE

    this.setLoading(tableId, true);

    this.store.dispatch(TableActions.updateTable({
      tableId,
      changes: {
        first: event.first ?? 0,
        rows: event.rows ?? 10,
        sortField: event.sortField,
        sortOrder: event.sortOrder,
        filters: event.filters,
      }
    }));

    this.lazyLoader.load<any>(endpoint, event, tableId).subscribe({
      next: ({ data, total }) => {
        console.log("recupera datos");

        this.setData(tableId, data);
        this.setTotalItems(tableId, total);
        this.setLoading(tableId, false);
      },
      error: () => {
        this.setData(tableId, []);
        this.setTotalItems(tableId, 0);
        this.setLoading(tableId, false);
      }
    });
  }

  reset(tableId: string, initialState?: TableState) {
    this.store.dispatch(TableActions.resetTable({ tableId, initialState }));
  }

  private setLoading(tableId: string, value: boolean) {
    this.loadingMap.get(tableId)?.next(value);
  }

  private setData(tableId: string, data: any[]) {
    console.log(data);

    this.dataMap.get(tableId)?.next(data);
    console.log(this.dataMap);

  }

  private setTotalItems(tableId: string, total: number) {
    this.totalItemsMap.get(tableId)?.next(total);
  }
}
