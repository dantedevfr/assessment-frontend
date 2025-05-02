import { MediaModel } from "./media.model";
import { AnswerModel } from "./answer.model";
import { TranslationModel } from "./translation.model";
import { WordModel } from "./word.model";

export type QuestionType = 'multiple_choice' | 'true_false' | 'open' | 'simple';

export interface QuestionModel {
  id?: number;
  text: string; // Rich HTML from editor
  description?:string;
  type: QuestionType;
  isMandatory?: boolean;
  translations?: TranslationModel[];
  wordBreakdown?: WordModel[]; // Breakdown per word
  media?: MediaModel[]; // General media for question
  answers?: AnswerModel[];
}
