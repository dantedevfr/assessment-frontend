import { Component, inject } from '@angular/core';
import { DashboardMetricsComponent } from '../../components/dashboard-metrics/dashboard-metrics.component';
import { CommonTableComponent } from '../../../../shared/components/common-table/common-table.component';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RowAction, TableColumn } from '../../../../shared/models/table.model';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable, take } from 'rxjs';


import { defaultTableState } from '../../../../shared/state/table/table.constants';
import { TableFacadeService } from '../../../../core/services/table-facade-service';
import { TableState } from '../../../../shared/state/table/table-state.model';


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
  private tableId = 'productsTable';
  private endpoint = 'products';

  private tableService = inject(TableFacadeService);

  // Observable para usar directamente en el HTML
  tableState$ = this.tableService.getState$(this.tableId);
  products$!: Observable<any[]>;
  isLoading$!: Observable<boolean>;
  totalItems$!: Observable<number>;
  filters$ = this.tableState$.pipe(
    map(state => state?.filters ? JSON.parse(JSON.stringify(state.filters)) : {})
  );

  ngOnInit() {
    this.tableService.init(this.tableId, defaultTableState);

    // 👉 Asignar después de inicializar
    this.products$ = this.tableService.getData$(this.tableId);
    this.isLoading$ = this.tableService.getLoading$(this.tableId);
    this.totalItems$ = this.tableService.getTotalItems$(this.tableId);

    this.tableState$.pipe(take(1)).subscribe((state) => {
      if (state) {
        this.handleLazyLoad(state);
        this.syncFiltersWithColumns(state);
      }
    });
  }

  selectedProducts: any[] = [];

  statuses = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' },
  ];

  columns_products: TableColumn[] = [
    {
      field: 'name',
      header: 'Name',
      sortable: true,
      filter: { type: 'text', placeholder: 'Search by name' },
    },
    {
      field: 'image',
      header: 'Image',
      sortable: false,
      filter: { type: 'text', placeholder: 'Search by image' },
    },
    {
      field: 'price',
      header: 'Price',
      sortable: true,
      filter: { type: 'text', placeholder: 'Search by price' },
    },
    {
      field: 'inventoryStatus',
      header: 'Status',
      sortable: true,
      filter: {
        type: 'custom-select',
        placeholder: 'Filter by status',
        options: this.statuses,
        selectedValue: null,
        templateType: 'tag',
      },
    },
    { field: 'rating', header: 'Rating', sortable: true },
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



  handleLazyLoad(event: LazyLoadEvent) {
    this.tableService.loadData(this.tableId, this.endpoint, event);
    const hasActiveFilters = !!event.filters && Object.values(event.filters).some(f => f?.value != null && f?.value !== '');

      if (!hasActiveFilters) {
        this.clearColumnFilterSelections();
      }

  }

  clearColumnFilterSelections() {
    this.columns_products.forEach(col => {
      if (col.filter && 'selectedValue' in col.filter) {
        col.filter.selectedValue = null;
      }
    });
  }

  reloadData() {
    this.tableService.reset(this.tableId);
    this.tableState$.pipe(take(1)).subscribe((state) => {
      if (state) {
        this.handleLazyLoad(state);
        this.syncFiltersWithColumns(state);
      }
    });
  }

  syncFiltersWithColumns(state: TableState) {
    this.columns_products.forEach((col) => {
      if (col.filter) {
        const filterValue = state?.filters?.[col.field]?.value || null;
        col.filter.selectedValue = filterValue;
      }
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK': return 'success';
      case 'LOWSTOCK': return 'warn';
      case 'OUTOFSTOCK': return 'danger';
      default: return 'info';
    }
  }

  editProduct(product: any) {
    console.log('Edit product', product);
  }

  deleteProduct(product: any) {
    console.log('Delete product', product);
  }

  handleCheckBoxAction(event: any) {
    this.selectedProducts = event;
  }
}
