import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedPrimeModule } from '../../shared/modules/shared-prime.module';
import { AdminSidebarComponent } from "./components/admin-sidebar/admin-sidebar.component";
import { AdminTopbarComponent } from './components/admin-topbar/admin-topbar.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { SettingsComponent } from './../../shared/components/settings/settings.component';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule,
  RouterModule, 
  SharedPrimeModule,
  SettingsComponent, 
  AdminSidebarComponent,
  AdminTopbarComponent,
  AdminFooterComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent{
  
}
