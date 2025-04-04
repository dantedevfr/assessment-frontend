import { TableState } from "../../models/table.model";
export const initialState: TableState = {
  data: [],
  loading: false,
  filters: [],
  currentPage: 0,
  pageSize: 0,
  sortField: "",
  sortOrder: 1, // 1 = ASC, -1 = DESC
  totalRecords: 0,
  tableId: ""
  };
