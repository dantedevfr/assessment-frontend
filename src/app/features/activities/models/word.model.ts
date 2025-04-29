import { TranslationModel } from "./translation.model";

export interface WordModel {
  id: number;
  text: string;
  languageCode: string;
  type?: 'word' | 'phrase' | 'expression';
  translations: TranslationModel[];
  //media?: MediaModel;
  //startTime?: number;
  //endTime?: number;
}
