import { MediaModel } from "./media.model";
export interface TranslationModel {
  id?: number;
  translatedText: string;
  sourceLanguageCode: string;
  targetLanguageCode: string;
  explanation?: string;
  media?: MediaModel[];
}
