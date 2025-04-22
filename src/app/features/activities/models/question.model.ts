import { ActivityMedia } from "./activity.model";

export interface QuestionModel {
  text: string;
  answers: AnswerModel[];
  allowMultipleCorrect?: boolean;
  explanation?: string;
}

export interface AnswerModel {
  id?: string;
  text: string;
  isCorrect: boolean;
  media?: ActivityMedia;
}
