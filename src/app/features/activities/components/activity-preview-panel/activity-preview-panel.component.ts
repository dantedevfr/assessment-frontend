import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewQuestionComponent } from '../previews/preview-question/preview-question.component';
import { ActivityModel } from '../../models/activity.model';
@Component({
  selector: 'app-activity-preview-panel',
  standalone: true,
  imports: [CommonModule, PreviewQuestionComponent],
  templateUrl: './activity-preview-panel.component.html',
  styleUrl: './activity-preview-panel.component.scss'
})
export class ActivityPreviewPanelComponent {
  @Input() activity!: ActivityModel;

  @Input() mode: 'admin-preview' | 'user-interactive' = 'admin-preview';
}
