import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-description.component.html',
  styleUrls: ['./question-description.component.scss']
})
export class QuestionDescriptionComponent {
  @Input() description: string = '';
  @Input() withBorder: boolean = false;
}
