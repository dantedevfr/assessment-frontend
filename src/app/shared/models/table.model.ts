export interface TableColumn {
  field: string;
  header: string;
  isHidden?: boolean;
  filterType?: 'text' | 'multiSelect';
  matchMode?: string;
  options?: Array<{ label: string; value: any; image?: string }>;
  showMenu?: boolean;
}

export interface TableFilter {
  field: string;
  value: any;
  matchMode?: string
}

export interface TableState {
  data: any[];
  loading: boolean;
  filters: TableFilter[];
  currentPage: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: number; // 1 = ASC, -1 = DESC
  totalRecords: number;
  tableId: string;
}

export interface LoadTableParams {
  tableId: string;
  filters: TableFilter[];
  pageSize: number;
  currentPage: number;
  sortField?: string;
  sortOrder?: number;
}

export interface TableResponse {
  data: any[];
  totalRecords: number;
}


export interface RowAction {
  icon: string;
  severity?: "success" | "info" | "warn" | "danger" | "help" | "primary" | "secondary" | "contrast";
  tooltip?: string;
  callback: (row: any) => void;
}
