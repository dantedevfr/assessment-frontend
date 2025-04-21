import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityFormComponent } from '../../components/activity-form/activity-form.component';
import { ACTIVITY_TYPE_OPTIONS } from '../../config/activity-types.config';
import { Select } from 'primeng/select';


@Component({
  selector: 'app-activities-creation-page',
  imports: [CommonModule,FormsModule,ActivityFormComponent,Select],
  templateUrl: './activities-creation-page.component.html',
  styleUrl: './activities-creation-page.component.scss'
})
export class ActivitiesCreationPageComponent {
  activityTypes = ACTIVITY_TYPE_OPTIONS;
  selectedType: string = 'simple_question';
}
