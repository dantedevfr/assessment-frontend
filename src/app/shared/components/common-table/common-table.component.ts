import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { Table } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { RowAction } from '../../models/table.model';


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
export class CommonTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];

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



  


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onGlobalFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dt2.filterGlobal(input.value, 'contains');
  }
  
}

/* with props
   const pageSize = this.filter.pageSize !== undefined ? this.filter.pageSize : 5;
   const first = event?.first || 0;
   const pageNumber = Math.ceil((first + 1) / pageSize);
   this.filter.currentPage = pageNumber;
   this.filter.sortField = event?.sortField;
   this.filter.sortOrder = event?.sortOrder == 1 ? true : false;
   this.filter.pageSize = event?.rows ? event?.rows : 5;
   this.buildFilterParams(event.filters);
   this.loadDataEvent.emit(this.filter);*/

/*
  @Input() rows: number = 10;
  @Input() totalRecords: number = 0;
  @Input() loading: boolean = false;
  @Input() rowsPerPageOptions: any = [];

  selectedRows: any[] = [];
  selectAll: boolean = false;

  @Output() selectionChange = new EventEmitter<any>();


  constructor() {}

  onLazyLoad(event: any) {
    console.log(event);
  }

  ngOnInit() {

  }


  */
