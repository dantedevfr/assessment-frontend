import { QuestionType } from '../models/question.model';

export const QUESTION_TYPES: { label: string; value: QuestionType }[] = [
  { label: 'Opción múltiple', value: 'multiple_choice' },
  { label: 'Verdadero/Falso', value: 'true_false' },
  { label: 'Pregunta abierta', value: 'open' },
  { label: 'Pregunta simple', value: 'simple' }
];

export const MEDIA_TYPES = ['image', 'audio', 'video'] as const;

export const QUESTION_MEDIA_TYPES = [
  { label: 'Imagen', value: 'image' },
  { label: 'Audio', value: 'audio' },
  { label: 'Video', value: 'video' }
] as const;

export const DEFAULT_SOURCE_LANG = 'en';
export const DEFAULT_TARGET_LANG = 'es';
export const QUESTION_EDITOR_HEIGHT = '250px';

export const QUESTION_EDITOR_STYLE = {
  height: '250px',
};

export const QUESTION_DIFFICULTY_OPTIONS = [
  { label: 'Fácil', value: 1 },
  { label: 'Intermedio', value: 2 },
  { label: 'Difícil', value: 3 },
  { label: 'Avanzado', value: 4 },
  { label: 'Experto', value: 5 }
];
