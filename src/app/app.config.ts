import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { MessageService } from 'primeng/api';
import { provideTableFeature } from './shared/state/table/table.feature';

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
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    MessageService,
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideTableFeature
]
};
