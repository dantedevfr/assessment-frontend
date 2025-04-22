import { Route } from '@angular/router';
import { ActivitiesManagementPageComponent } from './pages/activities-management-page/activities-management-page.component';
import { ActivityBuilderPageComponent } from './pages/activity-builder-page/activity-builder-page.component';
import { provideState } from '@ngrx/store';
import { activityBuilderReducer } from './state';
import { categoriesReducer } from '../categories/state';
import { provideEffects } from '@ngrx/effects';
import { CategoriesEffects } from '../categories/state/categories.effects';

export const ACTIVITIES_ROUTES: Route[] = [
  {
    path: '',
    component: ActivitiesManagementPageComponent,
  },
  {
    path: 'create',
    component: ActivityBuilderPageComponent,
    providers: [
      provideState({
        name: 'activityBuilder',
        reducer: activityBuilderReducer,
      }),
      provideState({ name: 'categories', reducer: categoriesReducer }), // 👈 AÑADÍ ESTE
      provideEffects(CategoriesEffects) // 👈 ¡Esto activa los effects!

    ]
  }
];
