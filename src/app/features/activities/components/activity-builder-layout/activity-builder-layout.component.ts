import { ActivityEditorPanelComponent } from './../activity-editor-panel/activity-editor-panel.component';
import { Component, inject } from '@angular/core';
import { ActivityPreviewPanelComponent } from '../activity-preview-panel/activity-preview-panel.component';
import { ActivityModel } from '../../models/activity.model';
import { Store } from '@ngrx/store';
import { selectActivityBuilder } from '../../state';
import { CommonModule } from '@angular/common'; // <--- Asegúrate de importar esto

@Component({
  selector: 'app-activity-builder-layout',
  imports: [ActivityEditorPanelComponent,ActivityPreviewPanelComponent,CommonModule],
  templateUrl: './activity-builder-layout.component.html',
  styleUrl: './activity-builder-layout.component.scss'
})
export class ActivityBuilderLayoutComponent {
  private store = inject(Store);
  activity: ActivityModel | null = null;

  ngOnInit() {
    this.store.select(selectActivityBuilder).subscribe(activity => {
      this.activity = activity;
    });
  }

}
