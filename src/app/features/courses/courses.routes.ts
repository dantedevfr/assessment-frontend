import { Route } from '@angular/router';
import { CoursesListPageComponent } from './pages/courses-list-page/courses-list-page.component';
import { CoursesCreatePageComponent } from './pages/courses-create-page/courses-create-page.component';
import { provideState } from '@ngrx/store';
import { counterReducer } from '../counter/state';


export const COURSES_ROUTES: Route[] = [
  {
    path: '',
    component: CoursesListPageComponent,
    providers: [
         provideState('counter', counterReducer), // 👈🏼 lo registrás aunque no tenga su propia ruta
    ] // Ruta por defecto para /courses
  },
  {
    path: 'creation',
    component: CoursesCreatePageComponent
  }
];
