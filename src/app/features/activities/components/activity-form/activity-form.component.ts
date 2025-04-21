import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-activity-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.scss'
})
export class ActivityFormComponent {
  @Input() type: string = 'question';

  questionText: string = '';
  showTranslation = false;

  options = [{ text: '', audio: '', image: '', correct: false }];
}
