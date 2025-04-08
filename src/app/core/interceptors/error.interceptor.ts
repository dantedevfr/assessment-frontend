import {
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
  const router = inject(Router);
  const notifier = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const status = error.status;
      const backendMessage = error.error?.message || null;

      if (environment.enableLogger) {
        console.error(`🚨 [${status}] Error`, error);
      }

      switch (status) {
        case 0:
          notifier.showError('Sin conexión', 'No se pudo conectar al servidor');
          break;
        case 401:
          notifier.showWarn('Sesión expirada', 'Por favor, inicia sesión nuevamente.');
          if (environment.redirectToLoginOn401) {
            router.navigate(['/login']);
          }
          break;
        case 403:
          notifier.showError('Acceso denegado', 'No tienes permisos para esta acción.');
          break;
        case 404:
          notifier.showError('No encontrado', 'El recurso solicitado no existe.');
          break;
        case 500:
          notifier.showError('Error interno del servidor', backendMessage || 'Intenta más tarde.');
          break;
        default:
          notifier.showError(
            'Error inesperado',
            backendMessage || 'Ocurrió un error desconocido'
          );
      }

      return throwError(() => error);
    })
  );
};
