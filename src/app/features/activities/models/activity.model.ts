import { QuestionModel } from "./question.model";

export interface ActivityModel {
  id?: number;
  title?: string;
  description?: string;
  type: 'question' | 'match_pairs' | 'translation' | 'fill_in_blank' | 'guess_the_word';
  difficulty?: number;
  is_visible?: boolean;
  is_expired?: boolean;
  id_category?: number;
  media?: ActivityMediaModel;
  question?: QuestionModel;
}

export interface ActivityMediaModel {
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
}
//comment
