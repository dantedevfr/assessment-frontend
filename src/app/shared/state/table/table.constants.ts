import { TableState } from './table-state.model';

export const defaultTableState: TableState = {
  first: 0,
  rows: 10,
  filters: {
    global: { value: '', matchMode: 'contains' },
    name: { value: null, matchMode: 'startsWith' },
    image: { value: null, matchMode: 'startsWith' },
    price: { value: null, matchMode: 'startsWith' },
    inventoryStatus: { value: null, matchMode: 'equals' },
  },
  sortField: 'name',
  sortOrder: -1,
};
