import { ActivityContentTabComponent } from './tabs/activity-content-tab/activity-content-tab.component';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-activity-editor-panel',
  imports: [CommonModule,SelectModule,FormsModule,TabViewModule,ActivityContentTabComponent],
  templateUrl: './activity-editor-panel.component.html',
  styleUrl: './activity-editor-panel.component.scss'
})
export class ActivityEditorPanelComponent {

}
