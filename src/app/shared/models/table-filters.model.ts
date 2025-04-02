// FILTERS 
export interface filters {
  dataKey: string,
  value: string,
  matchMode?: string
}


export interface Filters {

  filters: filters[],
  currentPage: number,
  pageSize: number;
  sortField: string,
  sortOrder: boolean,
  totalRecords: number,
}