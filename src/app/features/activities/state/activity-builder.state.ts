import { ActivityModel } from '../models/activity.model';
import { QuestionLayoutConfig } from '../models/question-layout-config.model';
import { QuestionModel } from '../models/question.model';

export interface ActivityBuilderState extends ActivityModel {}

export const defaultLayoutConfig: QuestionLayoutConfig = {
  direction: 'vertical',
  textPosition: 'top',
  descriptionPosition: 'bottom',
  mediaPosition: 'left',
  optionsPosition: 'center',
  mediaSize: 'medium',
  audioBehavior: 'onIconClick',
  audioStyle: 'duolingo',
  backgroundColor: '#ffffff',
  showMediaBorder: false,
  showTextBorder: false,
};

export const defaultQuestion: QuestionModel = {
  text: '',
  description: '',
  type: 'multiple_choice',
  isMandatory: false,
  translations: [],
  wordBreakdown: [],
  media: [],
  answers: []
};

export const initialActivityBuilderState: ActivityBuilderState = {
  title: '',
  description: '',
  type: 'question',
  difficulty: 1,
  is_visible: true,
  is_expired: false,
  id_category: undefined,
  /*media: {
    imageUrl: '',
    audioUrl: '',
    videoUrl: ''
  },*/
  question: defaultQuestion,
  layoutConfig: defaultLayoutConfig  
};
