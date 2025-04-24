import { ActivityModel } from '../models/activity.model';

export interface ActivityBuilderState extends ActivityModel {}

export const initialActivityBuilderState: ActivityBuilderState = {
  type: 'question',
  //questionSubtype: 'multiple_choice',
  is_visible: true,
  is_expired: false,
  question: {
    text: '',
    type: 'multiple_choice',
    answers: [],
  }
};
