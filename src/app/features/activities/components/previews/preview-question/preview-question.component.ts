import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionModel } from '../../../models/question.model';
import { QuestionLayoutConfig } from '../../../models/question-layout-config.model';
import { QuestionTextComponent } from './question-text/question-text.component';
@Component({
  selector: 'app-preview-question',
  standalone: true,
  imports: [CommonModule,QuestionTextComponent],
  templateUrl: './preview-question.component.html',
  styleUrl: './preview-question.component.scss'
})
export class PreviewQuestionComponent {
  @Input() question!: QuestionModel;
  @Input() layoutConfig!: QuestionLayoutConfig;
}
