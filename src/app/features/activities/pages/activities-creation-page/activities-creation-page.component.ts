import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityFormComponent } from '../../components/activity-form/activity-form.component';
@Component({
  selector: 'app-activities-creation-page',
  imports: [CommonModule,FormsModule,ActivityFormComponent],
  templateUrl: './activities-creation-page.component.html',
  styleUrl: './activities-creation-page.component.scss'
})
export class ActivitiesCreationPageComponent {
  selectedType: string = 'question';

}
