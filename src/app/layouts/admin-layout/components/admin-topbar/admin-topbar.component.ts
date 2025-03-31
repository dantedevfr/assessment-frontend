import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../../../../core/services/layout.service';
import { ConfiguratorComponent } from '../../../../shared/components/configurator/configurator.component';
@Component({
  selector: 'app-admin-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, ConfiguratorComponent],
  templateUrl: './admin-topbar.component.html',
  styleUrl: './admin-topbar.component.scss'
})
export class AdminTopbarComponent {
  items!: MenuItem[];

    constructor(public layoutService: LayoutService) {}

    configuratorVisible = false;

    toggleConfigurator() {
      this.configuratorVisible = !this.configuratorVisible;
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
