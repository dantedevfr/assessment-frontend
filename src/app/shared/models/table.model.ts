export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  filter?: {
    type: 'text' | 'custom-select';
    placeholder?: string;
    options?: { label: string; value: string }[];
    selectedValue?: string | null;
    templateType?: string;
  };
}

export interface TableFilter {
  field: string;
  value: any;
  matchMode?: string
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
  callback?: (row: any) => void; // ✅ hacer opcional
}
