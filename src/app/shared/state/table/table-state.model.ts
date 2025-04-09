export interface TableState {
  currentPage: number;
  rowsPerPage: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
  data?: any[];
  totalRecords?: number;
  loading?: boolean;
}

export interface TablesState {
  [tableId: string]: TableState;
}
