import { MediaModel } from "./media.model";
export interface TranslationModel {
  id?: number;
  translatedText: string;
  languageCode: string;    // 👈 Idioma de esta traducción (es, en, de, etc.)
  explanation?: string;
  media?: MediaModel[];
}
