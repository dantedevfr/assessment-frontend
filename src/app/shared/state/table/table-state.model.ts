export interface TableState {
  first: number;
  rows: number;
  sortField?: string;
  sortOrder?: number;
  filters?: { [key: string]: any };
}

export interface TableStateMap {
  [tableId: string]: TableState;
}

/*
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
}*/
