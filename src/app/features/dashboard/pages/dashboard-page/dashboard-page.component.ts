import { Component, inject } from '@angular/core';
import { DashboardMetricsComponent } from '../../components/dashboard-metrics/dashboard-metrics.component';
import { CommonTableComponent } from '../../../../shared/components/common-table/common-table.component';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RowAction, TableColumn } from '../../../../shared/models/table.model';
import { LazyTableLoaderService } from '../../../../core/services/lazy-table-loader.service';
import { LazyLoadEvent } from 'primeng/api';
//import { TableStateService } from '../../../../shared/state/table/table-state.service';
import { take } from 'rxjs';

import { Store } from '@ngrx/store';
import { TableActions } from '../../../../shared/state/table/table.actions';
import { selectTableById } from '../../../../shared/state/table/table.selectors';
import { defaultTableState } from '../../../../shared/state/table/table.constants';

export interface Product {
  id:number,
  name:string,
  image:string,
  price:any,
  inventoryStatus:string,
  rating:number
}

export interface TableState {
  first: number;                   // Índice del primer registro (para paginación)
  rows?: number;                    // Número de registros por página
  sortField?: string;              // Campo por el que se está ordenando
  sortOrder?: number;              // Orden ascendente (1) o descendente (-1)
  filters?: { [key: string]: any } // Filtros activos en la tabla
}
@Component({
  selector: 'app-dashboard-page',
  imports: [
    DashboardMetricsComponent,
    CommonTableComponent,
    TagModule,
    RatingModule,
    FormsModule,
    CommonModule,
    TableModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})


export class DashboardPageComponent {

  private store = inject(Store);
  private tableId = 'productsTable';

  products: any[] = [];
  totalItems = 0;
  isLoading = false;

  tableState$ = this.store.select(selectTableById(this.tableId));
  selectedProducts: any[] = [];

  constructor(private lazyTableLoader: LazyTableLoaderService) {}

  ngOnInit() {
    this.store.dispatch(
      TableActions.initTable({ tableId: this.tableId, initialState: defaultTableState })
    );

    this.tableState$.pipe(take(1)).subscribe((state) => {
      if (state) {
        this.handleProductsLazyLoad(state);
        this.syncFiltersWithColumns(state);
      }
    });
  }


  handleProductsLazyLoad(event: LazyLoadEvent) {
    console.log(event);

    this.isLoading = true;

    this.store.dispatch(
      TableActions.updateTable({
        tableId: this.tableId,
        changes: {
          first: event.first ?? 0,
          rows: event.rows ?? 10,
          sortField: event.sortField,
          sortOrder: event.sortOrder,
          filters: event.filters,
        },
      })
    );

    this.lazyTableLoader.load<any>('products', event, this.tableId).subscribe({
      next: ({ data, total }) => {
        this.products = data;
        this.totalItems = total;
        this.isLoading = false;
      },
      error: () => {
        this.products = [];
        this.totalItems = 0;
        this.isLoading = false;
      },
    });
  }

  reloadData() {
    this.store.dispatch(TableActions.resetTable({ tableId: this.tableId }));

    this.tableState$.pipe(take(1)).subscribe((state) => {
      if (state) {
        this.handleProductsLazyLoad(state);
        this.syncFiltersWithColumns(state);
      }
    });
  }

  syncFiltersWithColumns(state: any) {
    this.columns_products.forEach((col) => {
      if (col.filter) {
        const filterValue = state?.filters?.[col.field]?.value || null;
        col.filter.selectedValue = filterValue;
      }
    });
  }

  statuses = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' },
  ];

  columns_products: TableColumn[] = [
    {
      field: 'name',
      header: 'name',
      sortable: true,
      filter: { type: 'text', placeholder: 'Search by name' },
    },
    {
      field: 'image',
      header: 'image',
      sortable: false,
      filter: { type: 'text', placeholder: 'Search by Image' },
    },
    {
      field: 'price',
      header: 'price',
      sortable: true,
      filter: { type: 'text', placeholder: 'Search by Price' },
    },
    {
      field: 'inventoryStatus',
      header: 'status',
      sortable: true,
      filter: {
        type: 'custom-select',
        placeholder: 'Filter by status',
        options: this.statuses,
        selectedValue: null,
        templateType: 'tag',
      },
    },
    { field: 'rating', header: 'rating', sortable: true },
  ];

  globalFilterFields = ['name', 'price'];

  rowActions: RowAction[] = [
    {
      icon: 'pi pi-pencil',
      severity: 'info',
      tooltip: 'Editar',
      callback: (row: any) => this.editProduct(row),
    },
    {
      icon: 'pi pi-trash',
      severity: 'danger',
      tooltip: 'Eliminar',
      callback: (row: any) => this.deleteProduct(row),
    },
  ];

  editProduct(row: any) {
    console.log('Editando producto:', row);
  }

  deleteProduct(row: any) {
    console.log('Eliminando producto:', row);
  }

  handlePageChange(event: any) {
    console.log('handlePageChange (use without lazy)...', event);
  }

  handleCheckBoxAction(event: any) {
    this.selectedProducts = event;
  }

  getSeverity(
    status: string
  ): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }

  /*tableId = 'productsTable';
  products: any[] = [];
  totalItems = 0;
  isLoading = false;

  constructor(
    private lazyTableLoader: LazyTableLoaderService,
    private tableStateService: TableStateService
  ) {}

  ngOnInit() {
    this.tableStateService.dispatch({
      type: 'INIT',
      tableId: this.tableId,
      initialState: {
        first: 0,
        rows: 10,
        filters: {
          global: { value: '', matchMode: 'contains' },
        },
      },
    });

    this.syncFiltersWithColumns();
    const state = this.tableStateService.getSnapshot(this.tableId);
    this.handleProductsLazyLoad(state);
  }

  handleProductsLazyLoad(event: LazyLoadEvent) {
    this.isLoading = true;

    this.tableStateService.dispatch({
      type: 'UPDATE',
      tableId: this.tableId,
      changes: {
        first: event.first ?? 0,
        sortField: event.sortField,
        sortOrder: event.sortOrder,
        filters: event.filters,
        rows: event.rows ?? 10,
      },
    });

    const currentState = this.tableStateService.getSnapshot(this.tableId);

    this.lazyTableLoader
      .load<any>('products', currentState, this.tableId)
      .subscribe({
        next: ({ data, total }) => {
          this.products = data;
          this.totalItems = total;
          this.isLoading = false;
        },
        error: () => {
          this.products = [];
          this.totalItems = 0;
          this.isLoading = false;
        },
      });
  }

  reloadData() {
    const defaultState = {
      first: 0,
      rows: 10,
      filters: {
        global: { value: '', matchMode: 'contains' },
        name: { value: null, matchMode: 'startsWith' },
        image: { value: null, matchMode: 'startsWith' },
        price: { value: null, matchMode: 'startsWith' },
        inventoryStatus: { value: null, matchMode: 'equals' },
      },
      sortField: 'name',
      sortOrder: -1,
    };

    this.tableStateService.dispatch({
      type: 'UPDATE',
      tableId: this.tableId,
      changes: defaultState,
    });

    this.handleProductsLazyLoad(defaultState);
    this.syncFiltersWithColumns();
  }

  syncFiltersWithColumns() {
    const currentState = this.tableStateService.getSnapshot(this.tableId);

    this.columns_products.forEach((col) => {
      if (col.filter) {
        const filterValue = currentState?.filters?.[col.field]?.value || null;
        col.filter.selectedValue = filterValue;
      }
    });
  }

  statuses = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' },
  ];

  columns_products: TableColumn[] = [
    {
      field: 'name',
      header: 'name',
      sortable: true,
      filter: { type: 'text', placeholder: 'Search by name' },
    },
    {
      field: 'image',
      header: 'image',
      sortable: false,
      filter: { type: 'text', placeholder: 'Search by Image' },
    },
    {
      field: 'price',
      header: 'price',
      sortable: true,
      filter: { type: 'text', placeholder: 'Search by Price' },
    },
    {
      field: 'inventoryStatus',
      header: 'status',
      sortable: true,
      filter: {
        type: 'custom-select',
        placeholder: 'Filter by status',
        options: this.statuses,
        selectedValue: null,
        templateType: 'tag',
      },
    },
    { field: 'rating', header: 'rating', sortable: true },
  ];

  globalFilterFields = ['name', 'price'];
  selectedProducts: any[] = [];

  rowActions: RowAction[] = [
    {
      icon: 'pi pi-pencil',
      severity: 'info',
      tooltip: 'Editar',
      callback: (row: any) => this.editProduct(row),
    },
    {
      icon: 'pi pi-trash',
      severity: 'danger',
      tooltip: 'Eliminar',
      callback: (row: any) => this.deleteProduct(row),
    },
  ];

  editProduct(row: any) {
    console.log('Editando producto:', row);
  }

  deleteProduct(row: any) {
    console.log('Eliminando producto:', row);
  }

  handlePageChange(event: any) {
    console.log('handlePageChange (use without lazy)...', event);
  }

  handleCheckBoxAction(event: any) {
    this.selectedProducts = event;
  }

  getSeverity(
    status: string
  ): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }

  get tableStateSnapshot() {
    return this.tableStateService.getSnapshot(this.tableId);
  }
  */
}
