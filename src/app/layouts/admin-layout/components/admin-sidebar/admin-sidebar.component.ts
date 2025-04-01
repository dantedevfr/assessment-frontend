import { Component } from '@angular/core';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [AdminMenuComponent],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {

}
