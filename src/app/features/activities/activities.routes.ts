import { Route } from '@angular/router';
import { ActivitiesManagementPageComponent } from './pages/activities-management-page/activities-management-page.component';
import { ActivityBuilderPageComponent } from './pages/activity-builder-page/activity-builder-page.component';

export const ACTIVITIES_ROUTES: Route[] = [
  {
    path: '',
    component: ActivitiesManagementPageComponent,
  },
  {
    path: 'create',
    component: ActivityBuilderPageComponent,
  }
];
