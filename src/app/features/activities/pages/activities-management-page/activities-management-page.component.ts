import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { CommonTableComponent } from '../../../../shared/components/common-table/common-table.component';
import { TableFacadeService } from '../../../../core/services/table-facade-service';
import { defaultTableState } from '../../../../shared/state/table/table.constants';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable, take } from 'rxjs';
import { TableColumn, RowAction } from '../../../../shared/models/table.model';

import {
  ACTIVITY_COLUMNS,
  ACTIVITY_ACTIONS,
  ACTIVITY_GLOBAL_FILTERS,
} from '../../config/activities-table.config';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-activities-management-page',
  standalone: true,
  imports: [
    CommonModule,
       FormsModule,
       TableModule,
       TagModule,
       RatingModule,
       CommonTableComponent
  ],
  templateUrl: './activities-management-page.component.html',
  styleUrl: './activities-management-page.component.scss',
})
export class ActivitiesManagementPageComponent {
  private tableId = 'activitiesTable';
  private endpoint = 'activities';
  private tableService = inject(TableFacadeService);

  tableState$ = this.tableService.getState$(this.tableId);
  activities$!: Observable<any[]>;
  isLoading$!: Observable<boolean>;
  totalItems$!: Observable<number>;

  filters$ = this.tableState$.pipe(
    map((state) => (state?.filters ? JSON.parse(JSON.stringify(state.filters)) : {}))
  );

  ngOnInit() {
    this.tableService.init(this.tableId, defaultTableState);
    this.activities$ = this.tableService.getData$(this.tableId);
    this.isLoading$ = this.tableService.getLoading$(this.tableId);
    this.totalItems$ = this.tableService.getTotalItems$(this.tableId);

    this.tableState$.pipe(take(1)).subscribe((state) => {
      if (state) {
        this.handleLazyLoad(state);
      }
    });
  }

  selectedActivities: any[] = [];
  columns_activities: TableColumn[] = ACTIVITY_COLUMNS;
  globalFilterFields = ACTIVITY_GLOBAL_FILTERS;

  rowActions: RowAction[] = ACTIVITY_ACTIONS.map((action) => ({
    ...action,
    callback: (row: any) => {
      if (action.icon.includes('pencil')) this.editActivity(row);
      if (action.icon.includes('trash')) this.deleteActivity(row);
    },
  }));

  handleLazyLoad(event: LazyLoadEvent) {
    this.tableService.loadData(this.tableId, this.endpoint, event);
  }

  reloadData() {
    this.tableService.reset(this.tableId);
    this.tableState$.pipe(take(1)).subscribe((state) => {
      if (state) {
        this.handleLazyLoad(state);
      }
    });
  }

  editActivity(activity: any) {
    console.log('Edit activity', activity);
    // Aquí podrías abrir un modal, navegar, etc.
  }

  deleteActivity(activity: any) {
    console.log('Delete activity', activity);
    // Confirmar y eliminar lógica
  }

  handleCheckBoxAction(event: any) {
    this.selectedActivities = event;
  }

  getDifficultyColor(level: string | number): any {
    switch (+level) {
      case 1: return 'success';
      case 2: return 'info';
      case 3: return 'primary';
      case 4: return 'warning';
      case 5: return 'danger';
      default: return 'secondary';
    }
  }

  getSeverityFromLabel(label: string): any {
    switch (label.toLowerCase()) {
      case 'visible': return 'success';
      case 'oculta': return 'warning';
      case 'activa': return 'success';
      case 'expirada': return 'danger';
      default: return 'info';
    }
  }
}
