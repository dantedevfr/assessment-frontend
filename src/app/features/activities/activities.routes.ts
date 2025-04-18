import { Route } from '@angular/router';
import { ActivitiesManagementPageComponent } from './pages/activities-management-page/activities-management-page.component';

export const ACTIVITIES_ROUTES: Route[] = [
  {
    path: '',
    component: ActivitiesManagementPageComponent,
  }
];
