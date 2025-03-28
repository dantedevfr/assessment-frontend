import { SettingsComponent } from './../../shared/components/settings/settings.component';
import { Component, OnInit, HostBinding } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { AppSettings } from '../../core/models/app-settings.model';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { SharedPrimeModule } from '../../shared/modules/shared-prime.module';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SettingsComponent, SidebarComponent,SharedPrimeModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit{
  currentMenuType: string = 'horizontal';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.settings$.subscribe((settings: AppSettings) => {
      this.currentMenuType = settings.menuType;
    });
  }

  sidebarVisible: boolean = true;


  adjustMarginOnSidebarClose() {
    this.sidebarVisible = false;
    const viewContentElement = document.querySelector('.view-content');
    if (viewContentElement) {
      viewContentElement.setAttribute('style', 'margin-left: 0');
    }
  }

  adjustMarginOnSidebarOpen() {
    this.sidebarVisible = true;
    const viewContentElement = document.querySelector('.view-content');
    if (viewContentElement) {
      viewContentElement.setAttribute('style', 'margin-left: 300');
    }
  }

  toggleSidebar(): void {
    if(this.sidebarVisible){
      this.adjustMarginOnSidebarClose();
      this.sidebarVisible = false;
    }else{
      this.adjustMarginOnSidebarOpen();
      this.sidebarVisible = true;
    }

  }
}
