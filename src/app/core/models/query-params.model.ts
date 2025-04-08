export interface FilterQuery {
  field: string;
  value: any;
  matchMode?: 'contains' | 'equals' | 'startsWith';
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: FilterQuery[];
}
