import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { ThemeService } from '../../../core/services/theme.service';
import { AppSettings } from '../../../core/models/app-settings.model';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-panel">
      <h2>Settings</h2>

      <!-- Selección de tema (Aura, Lara, Nora) -->
      <div class="field">
        <label>Tema (Preset)</label>
        <select [ngModel]="settings.preset" (ngModelChange)="onPresetChange($event)">
          <option value="Aura">Aura</option>
          <option value="Lara">Lara</option>
          <option value="Nora">Nora</option>
        </select>
      </div>

      <!-- Modo claro/oscuro -->
      <div class="field">
        <label>Color Scheme</label>
        <select [ngModel]="settings.colorScheme" (ngModelChange)="onSchemeChange($event)">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <!-- Color primario -->
      <div class="field">
        <label>Primary Color</label>
        <input type="color"
               [ngModel]="settings.primaryColor"
               (ngModelChange)="onPrimaryColorChange($event)">
      </div>

      <!-- Tipo de menú -->
      <div class="field">
        <label>Menu Type</label>
        <select [ngModel]="settings.menuType" (ngModelChange)="onMenuTypeChange($event)">
          <option value="static">Static</option>
          <option value="overlay">Overlay</option>
          <option value="slim">Slim</option>
          <option value="reveal">Reveal</option>
          <option value="drawer">Drawer</option>
          <option value="horizontal">Horizontal</option>
        </select>
      </div>
    </div>
  `,
  styles: [`
    .settings-panel {
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #f8f8f8;
      max-width: 300px;
    }
    .field {
      margin-bottom: 1rem;
    }
    label {
      display: inline-block;
      width: 120px;
      font-weight: bold;
    }
    select, input[type="color"] {
      padding: 0.25rem;
    }
  `]
})
export class SettingsComponent implements OnInit {
  settings!: AppSettings; // usando la "Definite Assignment Assertion"

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.settings$.subscribe(s => {
      this.settings = s;
    });
  }

  onPresetChange(value: string) {
    this.themeService.updateSettings({ preset: value as AppSettings['preset'] });
  }

  onSchemeChange(value: 'light' | 'dark') {
    this.themeService.updateSettings({ colorScheme: value });
  }

  onPrimaryColorChange(value: string) {
    this.themeService.updateSettings({ primaryColor: value });
  }

  onMenuTypeChange(value: string) {
    this.themeService.updateSettings({ menuType: value as AppSettings['menuType'] });
  }
}
