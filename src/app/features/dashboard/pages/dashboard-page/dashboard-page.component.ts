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
import { take } from 'rxjs';

import { Store } from '@ngrx/store';
import { TableActions } from '../../../../shared/state/table/table.actions';
import { selectTableById } from '../../../../shared/state/table/table.selectors';
import { defaultTableState } from '../../../../shared/state/table/table.constants';


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
    this.isLoading = true;

    const hasFilters = !!event.filters && Object.values(event.filters).some(f => f?.value != null && f?.value !== '');

    if (!hasFilters) {
      this.clearColumnFilterSelections();
    }

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

  clearColumnFilterSelections() {
    this.columns_products.forEach(col => {
      if (col.filter) {
        col.filter.selectedValue = null;
      }
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

  get safeFilters(): { [key: string]: any } {
    let filters = {};

    this.tableState$.pipe(take(1)).subscribe(state => {
      filters = state?.filters ? JSON.parse(JSON.stringify(state.filters)) : {};
    });

    return filters;
  }

}
