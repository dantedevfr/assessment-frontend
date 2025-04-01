import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,  // Layout contenedor (standalone)
    children: [
      { path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'courses',
        loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule)
      }
      // Aquí puedes agregar otras rutas hijas para distintos features
    ]
  },
  { path: '**', redirectTo: 'admin/courses' }
];
