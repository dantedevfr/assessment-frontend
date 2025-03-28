import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura'; // Solo Aura por defecto
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [ provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          // Cambia el prefijo de las variables CSS a "my"
          prefix: 'my',
          darkModeSelector: '.my-app-dark'

        }

    }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),

  ]
};
