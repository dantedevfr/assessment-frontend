import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura'; // Solo Aura por defecto
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
          preset: Aura,
          options: { darkModeSelector: '.app-dark' }
      }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),

  ]
};
