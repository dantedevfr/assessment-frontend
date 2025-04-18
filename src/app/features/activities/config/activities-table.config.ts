import { RowAction, TableColumn } from '../../../shared/models/table.model';

export const ACTIVITY_VISIBILITY_OPTIONS = [
  { label: 'Visible', value: 'true' },
  { label: 'Oculta', value: 'false' },
];

export const ACTIVITY_EXPIRED_OPTIONS = [
  { label: 'Activa', value: 'false' },
  { label: 'Expirada', value: 'true' },
];

export const ACTIVITY_DIFFICULTY_OPTIONS = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
];

export const ACTIVITY_COLUMNS: TableColumn[] = [
  {
    field: 'title',
    header: 'Título',
    sortable: true,
    filter: { type: 'text', placeholder: 'Buscar por título' },
  },
  {
    field: 'difficulty',
    header: 'Dificultad',
    sortable: true,
    filter: {
      type: 'custom-select',
      placeholder: 'Filtrar por dificultad',
      options: ACTIVITY_DIFFICULTY_OPTIONS,
      templateType: 'tag',
    },
  },
  {
    field: 'activity_type.name',
    header: 'Tipo de actividad',
    sortable: true,
    filter: { type: 'text', placeholder: 'Buscar por tipo' },
  },
  {
    field: 'creator_name',
    header: 'Creador',
    sortable: true,
    filter: { type: 'text', placeholder: 'Buscar creador' },
  },
  {
    field: 'is_visible',
    header: 'Visible',
    sortable: true,
    filter: {
      type: 'custom-select',
      placeholder: 'Filtrar visibilidad',
      options: ACTIVITY_VISIBILITY_OPTIONS,
      templateType: 'tag',
    },
  },
  {
    field: 'is_expired',
    header: 'Estado',
    sortable: true,
    filter: {
      type: 'custom-select',
      placeholder: 'Filtrar estado',
      options: ACTIVITY_EXPIRED_OPTIONS,
      templateType: 'tag',
    },
  },
  {
    field: 'created_at',
    header: 'Fecha de creación',
    sortable: true,
    filter: {
      type: 'text', // Si luego tienes un filtro tipo date-picker, cámbialo
      placeholder: 'Buscar por fecha',
    },
  },
];

export const ACTIVITY_GLOBAL_FILTERS = ['title', 'creator_name', 'activity_type.name'];

export const ACTIVITY_ACTIONS: RowAction[] = [
  {
    icon: 'pi pi-pencil',
    severity: 'info',
    tooltip: 'Editar actividad',
  },
  {
    icon: 'pi pi-trash',
    severity: 'danger',
    tooltip: 'Eliminar actividad',
  },
];
