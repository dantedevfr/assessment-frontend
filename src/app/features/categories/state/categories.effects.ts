import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiClientService } from '../../../core/services/api-client.service';
import * as CategoryActions from './categories.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private api: ApiClientService
  ) {}

  loadAllCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadAllCategories),
      switchMap(() =>
        this.api.getAll<Category>('categories').pipe(
          map(categories => CategoryActions.loadAllCategoriesSuccess({ categories })),
          catchError(() => of(CategoryActions.loadAllCategoriesSuccess({ categories: [] }))) // Manejo simple de errores
        )
      )
    )
  );
}
