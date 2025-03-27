import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { AdminLayoutComponent } from './admin-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule, // Necesario para el router-outlet y routerLink
    //AdminLayoutComponent  // Importa el componente standalone
  ],

})
export class AdminLayoutModule { }
