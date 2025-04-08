import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { ApiListResponse } from '../models/api-response.model';
import { QueryParams } from '../models/query-params.model';


@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  getList<T>(endpoint: string, query?: QueryParams): Observable<ApiListResponse<T>> {
    let params = new HttpParams();

    if (query) {
      if (query.page) params = params.set('_page', query.page.toString());
      if (query.limit) params = params.set('_limit', query.limit.toString());
      if (query.sortBy) {
        params = params.set('_sort', query.sortBy);
        params = params.set('_order', query.sortOrder || 'asc');
      }

      if (query.filters) {
        for (const filter of query.filters) {
          if (filter.value !== null && filter.value !== '') {
            const key = filter.field;
            const mode = filter.matchMode ?? 'contains';

            if (key === 'q') {
              params = params.set('q', filter.value);
            } else if (mode === 'equals') {
              params = params.set(key, filter.value);
            } else {
              // contains, startsWith, etc.
              params = params.set(`${key}_like`, filter.value);
            }
          }
        }
      }
    }

    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`, {
      params,
      observe: 'response',
    }).pipe(
      map((response: HttpResponse<T[]>) => {
        const total = Number(response.headers.get('X-Total-Count') ?? '0');
        return {
          data: response.body ?? [],
          total,
        };
      }),
      catchError((err) => {
        console.error('❌ Error in API call', err);
        return throwError(() => err);
      })
    );
  }

  getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`).pipe(
      catchError(err => {
        console.error('❌ Error fetching all items', err);
        return throwError(() => err);
      })
    );
  }

  getById<T>(endpoint: string, id: string | number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`).pipe(
      catchError(err => {
        console.error('❌ Error fetching item by ID', err);
        return throwError(() => err);
      })
    );
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  delete<T>(endpoint: string, id: string | number): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }
}
