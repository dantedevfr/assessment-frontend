import { ActivityModel } from '../models/activity.model';
import { QuestionLayoutConfig } from '../models/question-layout-config.model';
import { QuestionModel } from '../models/question.model';

export interface ActivityBuilderState extends ActivityModel {}

export const defaultLayoutConfig: QuestionLayoutConfig = {
  gridColumns: 12,
  gridGap: 16,
  padding: 24,
  backgroundColor: '#ffffff',
  animateOnLoad: false,
  ambientEnabled: false,
  blocks: [
    {
      id: 'text-1',
      type: 'text',
      position: { colStart: 1, colSpan: 12, rowStart: 1 },
      align: 'center',
      style: {
        width: 'full',
        border: false,
        padding: 8,
        alignSelf:'center'
      }
    },
    {
      id: 'description-1',
      type: 'description',
      position: { colStart: 1, colSpan: 12, rowStart: 5 },
      align: 'center',
      style: {
        width: 'full',
        border: false,
        padding: 8,
        alignSelf:'center'
      }
    },
    {
      id: 'media-1',
      type: 'media',
      position: { colStart: 1, colSpan: 12, rowStart: 2 },
      align: 'center',
      style: {
        width: 'full',
        border: true,
        padding: 8,
        alignSelf:'center'

      }
    },
    {
      id: 'options-1',
      type: 'options',
      position: { colStart: 1, colSpan: 12, rowStart: 3 },
      align: 'start',
      style: {
        width: 'full',
        border: true,
        padding: 8,
        alignSelf:'center'

      }
    }
  ]
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
