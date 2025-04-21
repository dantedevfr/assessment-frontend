import { TableState } from './table-state.model';

export function getDefaultTableState(params?: {
  filters?: { [key: string]: any };
  sortField?: string;
  rows?: number;
}): TableState {
  return {
    first: 0,
    rows: params?.rows ?? 10,
    filters: { ...(params?.filters ?? {}) }, // siempre una copia segura
    sortField: params?.sortField ?? undefined,
    sortOrder: -1,
  };
}
