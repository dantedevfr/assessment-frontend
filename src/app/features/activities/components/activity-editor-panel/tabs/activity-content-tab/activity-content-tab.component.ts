import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';


@Component({
  selector: 'app-activity-content-tab',
  imports: [CommonModule, FormsModule, SelectModule],
  templateUrl: './activity-content-tab.component.html',
  styleUrl: './activity-content-tab.component.scss'
})
export class ActivityContentTabComponent {
  questionTitle: string = '';
  selectedType: string = 'simple_question';

  activityTypes = [
    { label: 'Pregunta simple', value: 'simple_question' },
    { label: 'Opción múltiple', value: 'multiple_choice' },
    { label: 'Verdadero o falso', value: 'true_false' },
    { label: 'Pregunta abierta', value: 'open_question' },
  ];
}
