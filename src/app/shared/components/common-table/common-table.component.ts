import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule, TablePageEvent } from 'primeng/table';
import { TieredMenu } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { Table } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { RowAction } from '../../models/table.model';
import { TableColumn } from '../../models/table.model';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss',
  standalone: true,
  imports: [TableModule,
    CommonModule,
    TieredMenu,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TagModule,
    SelectModule,
    FormsModule,
    TooltipModule

  ],
})
export class CommonTableComponent <T = any> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn[] = [];

  @Input() actions: MenuItem[] = [];

  /* Caption properties and actions*/
  @Input() showCaption: boolean = false;
  @Input() captionTitle: string = 'Tabla';
  @Input() showRefreshButton: boolean = false;
  @Input() refreshButtonIcon: string = 'pi pi-refresh';
  @Output() onRefresh = new EventEmitter<void>();

  /* Custom body template */
  @Input() bodyTemplate?: TemplateRef<any>;

  /* Table styles */
  @Input() tableStyle: { [klass: string]: any } = { 'min-width': '40rem' }; // valor por defecto opcional
  @Input() size: 'small' | 'large' | undefined = undefined;
  @Input() showGridlines: boolean = false;
  @Input() stripedRows: boolean = false;

  /* Pagination */
  @Input() paginator: boolean = false;
  @Input() rows: number = 10;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];
  @Output() onPageChange = new EventEmitter<TablePageEvent>();

  /* Sort */
  @Input() sortMode: 'single' | 'multiple' = 'single';
  @Input() sortField?: string;
  @Input() sortOrder: number = 1;

  /*Filters*/
  @Input() showSearch: boolean = false;
  @Input() searchPlaceholder: string = 'Search keyword';
  @Input() globalFilterFields: string[] = [];
  @Input() enableColumnFilter: boolean = false;
  @ViewChild('dt2') dt2!: Table;
  @Input() customFilterTemplate?: TemplateRef<any>;

  /* Checkbox selection */
  @Input() enableSelection: boolean = false;
  @Input() selection: any[] = [];
  @Output() selectionChange = new EventEmitter<any[]>();
  @Input() dataKey: string = 'id'; // clave única del objeto, puedes cambiarla si quieres

  /* Row actions */
  @Input() rowActions: RowAction[] = [];

  /*Scrolling*/
  @Input() scrollable: boolean = false;
  @Input() scrollHeight: string = '400px';

  /*Lazy loading*/
  @Input() lazy: boolean = false;
  @Input() totalRecords: number = 0;
  @Input() loading: boolean = false;
  @Output() onLazyLoad = new EventEmitter<any>();


  /*State values*/
  @Input() first: number = 0;
  @Input() filters: { [s: string]: any } = {};

  globalFilterValue: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && this.filters?.['global']?.value !== undefined) {
      this.globalFilterValue = this.filters['global'].value;
    }
  }

  onGlobalFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;

    this.globalFilterValue = newValue;


    const updatedFilters = {
      ...this.filters,
      global: { value: newValue, matchMode: 'contains' },
    };

    this.onLazyLoad.emit({
      first: this.first,
      rows: this.rows,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      filters: updatedFilters,
    });
  }

  handleTextFilter(colField: string, event: Event, matchMode: string = 'contains', filterFn?: Function) {
    const value = (event.target as HTMLInputElement).value;

    // Aplica el filtro visual de PrimeNG
    if (filterFn) filterFn(value);

    // Lanza el lazy load personalizado
    this.onColumnFilterChange(colField, value, matchMode);
  }


  onColumnFilterChange(field: string, value: any, matchMode: string) {
    const updatedFilters = { ...this.filters };

    updatedFilters[field] = {
      value: value === null || value === '' ? null : value,
      matchMode
    };

    this.filters = updatedFilters;

    this.onLazyLoad.emit({
      first: this.first,
      rows: this.rows,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      filters: updatedFilters
    });
  }



}

