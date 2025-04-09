// table.effects.ts
import { inject } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { map, mergeMap, catchError, of } from 'rxjs';
import { LazyTableLoaderService } from '../../../core/services/lazy-table-loader.service';
import { loadTableData, loadTableDataSuccess, loadTableDataFailure } from './table.actions';

export const tableEffects = {
  loadDataEffect: createEffect(
    (actions$ = inject(Actions), service = inject(LazyTableLoaderService)) =>
      actions$.pipe(
        ofType(loadTableData),
        mergeMap(({ tableId, state }) => {
          const event = {
            first: state.currentPage * state.rowsPerPage,
            rows: state.rowsPerPage,
            sortField: state.sortBy,
            sortOrder: state.sortOrder === 'asc' ? 1 : -1,
            filters: state.filters ?? {}
          };

          return service.load<any>('products', event, tableId).pipe(
            map(({ data, total }) =>
              loadTableDataSuccess({ tableId, data, totalRecords: total, state })
            ),
            catchError(() => of(loadTableDataFailure({ tableId })))
          );
        })
      ),
    { functional: true }
  )
};
