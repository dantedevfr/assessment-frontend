import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiClientService } from '../../../core/services/api-client.service';
import * as CategoryActions from './categories.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Category } from '../models/category.model';
import { Store } from '@ngrx/store';
import * as CategorySelectors from '../state/categories.selectors';

@Injectable()
export class CategoriesEffects {
  private store = inject(Store);

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
          catchError(() => of(CategoryActions.loadAllCategoriesSuccess({ categories: [] })))
        )
      )
    )
  );

  rebuildLevels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadAllCategoriesSuccess),
      withLatestFrom(this.store.select(CategorySelectors.selectSelectedCategories)),
      map(([{ categories }, selected]) => {
        const levels: Category[][] = [];

        let parentId = 0;
        for (const selectedCat of selected) {
          const siblings = categories.filter(c => c.id_parent_category === parentId);
          levels.push(siblings);
          parentId = selectedCat?.id ?? 0;
        }

        const children = categories.filter(c => c.id_parent_category === parentId);
        if (children.length > 0) {
          levels.push(children);
        }

        return CategoryActions.loadCategoryLevels({ levels });
      })
    )
  );
}
