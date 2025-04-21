import { RowAction, TableColumn } from '../../../shared/models/table.model';

export const PRODUCT_STATUSES = [
  { label: 'In Stock', value: 'INSTOCK' },
  { label: 'Low Stock', value: 'LOWSTOCK' },
  { label: 'Out of Stock', value: 'OUTOFSTOCK' },
];

export const PRODUCT_TABLE_FILTERS = {
  global: { value: '', matchMode: 'contains' },
  name: { value: null, matchMode: 'startsWith' },
  image: { value: null, matchMode: 'startsWith' },
  price: { value: null, matchMode: 'startsWith' },
  inventoryStatus: { value: null, matchMode: 'equals' },
};


export const PRODUCT_COLUMNS: TableColumn[] = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    filter: { type: 'text', placeholder: 'Search by name' },
  },
  {
    field: 'image',
    header: 'Image',
    sortable: false,
    filter: { type: 'text', placeholder: 'Search by image' },
  },
  {
    field: 'price',
    header: 'Price',
    sortable: true,
    filter: { type: 'text', placeholder: 'Search by price' },
  },
  {
    field: 'inventoryStatus',
    header: 'Status',
    sortable: true,
    filter: {
      type: 'custom-select',
      placeholder: 'Filter by status',
      options: PRODUCT_STATUSES || [],
      templateType: 'tag',
    },
  },
  { field: 'rating', header: 'Rating', sortable: true },
];

export const PRODUCT_GLOBAL_FILTERS = ['name', 'price'];

export const PRODUCT_ACTIONS: RowAction[] = [
  {
    icon: 'pi pi-pencil',
    severity: 'info',
    tooltip: 'Editar',
  },
  {
    icon: 'pi pi-trash',
    severity: 'danger',
    tooltip: 'Eliminar',
  },
];
