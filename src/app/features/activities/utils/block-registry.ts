import { Type } from '@angular/core';
import { QuestionTextComponent } from '../components/previews/preview-question/question-text/question-text.component';
import { QuestionDescriptionComponent } from '../components/previews/preview-question/question-description/question-description.component';

export const blockRegistry: Record<string, Type<any>> = {
  text: QuestionTextComponent,
  description: QuestionDescriptionComponent
};
