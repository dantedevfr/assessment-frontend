import { ActivityModel } from '../models/activity.model';
import { QuestionLayoutConfig } from '../models/question-layout-config.model';
import { QuestionModel } from '../models/question.model';

export interface ActivityBuilderState extends ActivityModel {}

export const defaultLayoutConfig: QuestionLayoutConfig = {
  backgroundColor: '#ffffff',
  direction: 'vertical',

  blockOrder: {
    top: ['media'],
    center: ['text', 'description'],
    bottom: ['options']
  },

  blockDirection: {
    top: 'horizontal',
    center: 'vertical',
    bottom: 'horizontal'
  },

  blockAlign: {
    top: 'center',
    center: 'start',
    bottom: 'space-between'
  },

  blockStyles: {
    media: {
      width: 'full',
      alignSelf: 'center'
    },
    text: {
      width: 'fit',
      alignSelf: 'start'
    },
    description: {
      width: 'auto',
      alignSelf: 'stretch'
    },
    options: {
      width: 'fit',
      alignSelf: 'center'
    }
  },

  textAlign: 'center',
  descriptionAlign: 'left',
  mediaSize: 'medium',
  audioBehavior: 'onIconClick',
  audioStyle: 'duolingo',
  showMediaBorder: true,
  showTextBorder: false,
  padding: 16,
  borderRadius: 8,
  animateOnLoad: false,
  ambientEnabled: false
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
