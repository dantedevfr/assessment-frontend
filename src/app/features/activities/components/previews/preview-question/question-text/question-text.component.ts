import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-text.component.html',
  styleUrls: ['./question-text.component.scss']
})
export class QuestionTextComponent {
  @Input() text: string = '';
  @Input() align: 'left' | 'center' | 'right' = 'center';
  @Input() withBorder: boolean = false;
}
