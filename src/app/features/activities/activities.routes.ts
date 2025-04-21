import { Route } from '@angular/router';
import { ActivitiesManagementPageComponent } from './pages/activities-management-page/activities-management-page.component';
import { ActivitiesCreationPageComponent } from './pages/activities-creation-page/activities-creation-page.component';
export const ACTIVITIES_ROUTES: Route[] = [
  {
    path: '',
    component: ActivitiesManagementPageComponent,
  },
  {
    path: 'creation',
    component: ActivitiesCreationPageComponent,
  }
];
