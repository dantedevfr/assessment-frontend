import { RowAction, TableColumn } from '../../../shared/models/table.model';

export const ACTIVITY_TABLE_FILTERS = {
  global: { value: '', matchMode: 'contains' },
  title: { value: null, matchMode: 'startsWith' },
  difficulty: { value: null, matchMode: 'equals' },
  activityType: { value: null, matchMode: 'startsWith' },
  creatorName: { value: null, matchMode: 'startsWith' },
  category: { value: null, matchMode: 'startsWith' },
  isVisible: { value: null, matchMode: 'equals' },
  isExpired: { value: null, matchMode: 'equals' },
  createdAt: { value: null, matchMode: 'startsWith' },
};

export const ACTIVITY_VISIBILITY_OPTIONS = [
  { label: 'Visible', value: 'true' },
  { label: 'Oculta', value: 'false' },
];

export const ACTIVITY_EXPIRED_OPTIONS = [
  { label: 'Activa', value: 'false' },
  { label: 'Expirada', value: 'true' },
];

export const ACTIVITY_DIFFICULTY_OPTIONS = [
  { label: 'Fácil', value: 'easy' },
  { label: 'Media', value: 'medium' },
  { label: 'Difícil', value: 'hard' },
];

export const ACTIVITY_TYPE_OPTIONS = [
  { label: 'Pregunta simple', value: 'simple_question' },
  { label: 'Pregunta abierta', value: 'open_question' },
  { label: 'Selección múltiple', value: 'multiple_choice' },
  { label: 'Verdadero/Falso', value: 'true_false' },
  { label: 'Traducción', value: 'translation_word' },
  { label: 'Emparejamiento', value: 'match_pairs' },
  { label: 'Ordenar palabras', value: 'word_order' },
  { label: 'Selección de audio', value: 'audio_selection' },
  { label: 'Encuentra la palabra', value: 'odd_one_out' }, 
  { label: 'Selecciona la gramatica', value: 'grammar_selection' },
  { label: 'Selecciona la imagen', value: 'image_selection' },
  { label: 'Multiples respuestas', value: 'multiple_answer' },
  { label: 'Escoge el sinonimo', value: 'synonym_choice' },
  { label: 'Traduce la palabra', value: 'translation_phrase' },

];

export const ACTIVITY_CATEGORY_OPTIONS = [
  { label: 'Vocabulario', value: 'vocabulary' },
  { label: 'Gramática', value: 'grammar' },
  { label: 'Comprensión', value: 'comprehension' },
  { label: 'Saludos', value: 'greetings' },
  { label: 'Educación', value: 'education' },
  { label: 'Lógica', value: 'logic' },
  { label: 'Cultura', value: 'culture' },
];

export const ACTIVITY_COLUMNS: TableColumn[] = [
  {
    field: 'title',
    header: 'Título',
    sortable: true,
    filter: { type: 'text', placeholder: 'Título' },
  },
  {
    field: 'difficulty',
    header: 'Dificultad',
    sortable: true,
    filter: {
      type: 'custom-select',
      placeholder: 'Dificultad',
      options: ACTIVITY_DIFFICULTY_OPTIONS || [],
      templateType: 'tag',
    },
  },
  {
    field: 'activityType',
    header: 'Tipo de actividad',
    sortable: true,
    filter: {
      type: 'custom-select',
      placeholder: 'Tipo',
      options: ACTIVITY_TYPE_OPTIONS || [],
    },
  },
  {
    field: 'creatorName',
    header: 'Creador',
    sortable: true,
    filter: { type: 'text', placeholder: 'Creador' },
  },
  {
    field: 'category',
    header: 'Categoría',
    sortable: true,
    filter: {
      type: 'custom-select',
      placeholder: 'Categoría',
      options: ACTIVITY_CATEGORY_OPTIONS || [],
    },
  },
  {
    field: 'tags',
    header: 'Tags',
    sortable: false
  },
  {
    field: 'isVisible',
    header: 'Visible',
    sortable: true,
    filter: {
      type: 'custom-select',
      placeholder: 'Visibilidad',
      options: ACTIVITY_VISIBILITY_OPTIONS || [],
      templateType: 'tag',
    },
  },
  {
    field: 'isExpired',
    header: 'Estado',
    sortable: true,
    filter: {
      type: 'custom-select',
      placeholder: 'Estado',
      options: ACTIVITY_EXPIRED_OPTIONS || [],
      templateType: 'tag',
    },
  },
  {
    field: 'createdAt',
    header: 'Fecha de creación',
    sortable: true,
    filter: {
      type: 'text',
      placeholder: 'Fecha',
    },
  },
];

export const ACTIVITY_GLOBAL_FILTERS = ['title', 'creator_name'];

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
