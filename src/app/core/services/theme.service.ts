import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppSettings } from '../models/app-settings.model';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Configuración inicial por defecto
  private defaultSettings: AppSettings = {
    preset: 'Aura',
    colorScheme: 'light',
    primaryColor: '#2196f3',
    menuType: 'horizontal'
  };

  constructor() { }
  private settingsSubject = new BehaviorSubject<AppSettings>(this.defaultSettings);
  settings$ = this.settingsSubject.asObservable();

  get currentSettings(): AppSettings {
    return this.settingsSubject.value;
  }

  /**
   * Actualiza los settings y aplica los cambios (clases, variables CSS, etc.)
   */
  updateSettings(newSettings: Partial<AppSettings>): void {
    const updated = { ...this.currentSettings, ...newSettings };
    this.settingsSubject.next(updated);

    // Aplica cambios de Dark Mode en el body (si usas darkModeSelector = '.my-app-dark' en PrimeNG)
    this.toggleDarkMode(updated.colorScheme === 'dark');

    // Actualiza la variable CSS del color primario
    this.setPrimaryColor(updated.primaryColor);

    // (Opcional) Cargar dinámicamente un CSS distinto si cambia el preset
    // this.loadThemeCss(updated.preset);

    // (Opcional) Guardar en localStorage
    // this.saveSettingsToLocalStorage();
  }

  /**
   * Ejemplo de cómo alternar "dark mode" con la clase 'my-app-dark'.
   * Esto funciona si en tu app.config.ts definiste:
   * darkModeSelector: '.my-app-dark'
   */
  private toggleDarkMode(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('my-app-dark');
    } else {
      document.body.classList.remove('my-app-dark');
    }
  }

  /**
   * Establece el color primario con una variable CSS.
   * Ejemplo: --my-primary: #2196f3
   * (si prefix = 'my' en app.config.ts)
   */
  private setPrimaryColor(color: string): void {
    document.documentElement.style.setProperty('--my-primary', color);
  }

  /**
   * Ejemplo de carga dinámica de un archivo CSS si quieres
   * cambiar totalmente el preset (Aura, Lara, etc.) en tiempo real.
   * Requiere que tengas esos CSS en tu carpeta "assets/themes".
   */
  private loadThemeCss(themeName: string): void {
    const linkId = 'client-theme';
    let linkEl = document.getElementById(linkId) as HTMLLinkElement;

    if (!linkEl) {
      linkEl = document.createElement('link');
      linkEl.id = linkId;
      linkEl.rel = 'stylesheet';
      document.head.appendChild(linkEl);
    }

    // Asegúrate de tener "aura.css", "lara.css", etc. en "assets/themes/"
    linkEl.href = `assets/themes/${themeName.toLowerCase()}.css`;
  }

  // Persistencia local (opcional)
  loadSettingsFromLocalStorage(): void {
    const data = localStorage.getItem('app-settings');
    if (data) {
      const parsed: AppSettings = JSON.parse(data);
      this.settingsSubject.next(parsed);
      // Aplica los cambios visuales
      this.toggleDarkMode(parsed.colorScheme === 'dark');
      this.setPrimaryColor(parsed.primaryColor);
    }
  }

  saveSettingsToLocalStorage(): void {
    localStorage.setItem('app-settings', JSON.stringify(this.currentSettings));
  }
}
