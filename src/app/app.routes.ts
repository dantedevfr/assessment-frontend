import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { CategoriesManagementPageComponent } from './features/categories/pages/categories-management-page/categories-management-page.component';
import { provideState } from '@ngrx/store';
import { categoriesReducer } from './features/categories/state';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard',
        component: DashboardPageComponent
      },
      {
        path: 'courses',
        loadChildren: () => import('./features/courses/courses.routes').then(m => m.COURSES_ROUTES)
      },
      { path: 'categories',
        component: CategoriesManagementPageComponent,
        providers: [
          provideState('categories', categoriesReducer),
        ]
      },
      {
        path: 'activities',
        loadChildren: () => import('./features/activities/activities.routes').then(m => m.ACTIVITIES_ROUTES)
      },
      // Add more child routes
    ]
  },
  { path: '**', redirectTo: 'admin/courses' }
];
