// core/services/lazy-table-loader.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { QueryParams } from '../models/query-params.model';
import { LazyLoadEvent } from 'primeng/api';

interface TableState {
  query: QueryParams;
  event: LazyLoadEvent;
  lastResults: any[];
  totalItems: number;
}

@Injectable({ providedIn: 'root' })
export class LazyTableLoaderService {
  private memoryState = new Map<string, TableState>();

  constructor(private api: ApiClientService) {}

  private buildQueryParams(event: LazyLoadEvent): QueryParams {
    const filters: any[] = [];

    const globalValue = event.filters?.['global']?.value;
    if (globalValue) {
      filters.push({ field: 'q', value: globalValue, matchMode: 'contains' });
    }

    for (const key in event.filters) {
      if (key === 'global') continue;
      const filterMeta = event.filters[key];
      if (filterMeta?.value !== null && filterMeta?.value !== '') {
        filters.push({
          field: key,
          value: filterMeta.value,
          matchMode: filterMeta.matchMode || 'contains'
        });
      }
    }

    return {
      page: event.first! / event.rows! + 1,
      limit: event.rows!,
      sortBy: event.sortField!,
      sortOrder: event.sortOrder === 1 ? 'asc' : 'desc',
      filters
    };
  }

  load<T>(
    endpoint: string,
    event: LazyLoadEvent,
    cacheKey: string
  ): Observable<{ data: T[]; total: number }> {
    const query = this.buildQueryParams(event);
    const cached = this.memoryState.get(cacheKey);

    if (cached && JSON.stringify(cached.query) === JSON.stringify(query)) {
      return of({ data: cached.lastResults as T[], total: cached.totalItems });
    }

    return this.api.getList<T>(endpoint, query).pipe(
      tap((res) => {
        this.memoryState.set(cacheKey, {
          query,
          event,
          lastResults: res.data,
          totalItems: res.total
        });
      })
    );
  }

  getCurrentState<T>(key: string): {
    query: QueryParams;
    event: LazyLoadEvent;
    lastResults: T[];
    totalItems: number;
  } | undefined {
    return this.memoryState.get(key);
  }

  getEvent(key: string): LazyLoadEvent | undefined {
    return this.memoryState.get(key)?.event;
  }

  clearState(key: string) {
    this.memoryState.delete(key);
  }

  clearAll() {
    this.memoryState.clear();
  }
}
