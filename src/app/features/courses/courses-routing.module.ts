import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListPageComponent } from './pages/courses-list-page/courses-list-page.component'; // Asegúrate de tener este componente
import { CoursesCreatePageComponent } from './pages/courses-create-page/courses-create-page.component';

const routes: Routes = [
  { path: '', component: CoursesListPageComponent }, // Ruta por defecto para /courses
  { path: 'creation', component: CoursesCreatePageComponent }, // /admin/courses/creation

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
