import { MediaModel } from "./media.model";
import { TranslationModel } from "./translation.model";
import { WordModel } from "./word.model";

export interface AnswerModel {
  id?: number;
  text: string;
  isCorrect: boolean;
  translations?: TranslationModel[];
  wordBreakdown?: WordModel[];
  media?: MediaModel[];
}
