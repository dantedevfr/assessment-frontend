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

