export interface ActivityTypeOption {
    label: string;
    value: string;
    description?: string;
  }
  
  export const ACTIVITY_TYPE_OPTIONS: ActivityTypeOption[] = [
    { label: 'Pregunta simple', value: 'simple_question' },
    { label: 'Pregunta abierta', value: 'open_question' },
    { label: 'Opción múltiple', value: 'multiple_choice' },
    { label: 'Verdadero o falso', value: 'true_false' },
    { label: 'Emparejamiento', value: 'match_pairs' },
    { label: 'Traducción', value: 'translation' },
    // Más tipos aquí...
  ];