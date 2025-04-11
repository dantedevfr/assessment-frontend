import { Component } from '@angular/core';
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
import { TableStateService } from '../../../../shared/state/table/table-state.service';
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
  tableId = 'productsTable';

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
  /*
  products: any[] = [];
  totalItems = 0;
  isLoading = false;
  tableState: TableState | null = null;

  constructor(private lazyTableLoader: LazyTableLoaderService) {}
  ngOnInit() {
    const stateJson = localStorage.getItem('dashboardTableState');
    if (stateJson) {
      this.tableState = JSON.parse(stateJson);
    } else {
      this.tableState = {
        first: 0,
        rows: 10,
        filters: {
          global: { value: '', matchMode: 'contains' }, // <--- aquí
        },
      };
    }

    // Sincronizar el valor de los filtros con las columnas
    this.columns_products.forEach((col) => {
      // Solo si la columna tiene configurado un objeto 'filter'
      if (col.filter) {
        const filterValue = this.tableState?.filters?.[col.field]?.value || null;
        // Para los selects
        if (col.filter.type === 'custom-select') {
          col.filter.selectedValue = filterValue;
        } else {
          // para los demás (text, number, etc.)
          col.filter.selectedValue = filterValue;
        }
      }
    });

    // Ahora lanzo la primera carga perezosa
    this.handleProductsLazyLoad(this.tableState as any);
  }


  handleProductsLazyLoad(event: LazyLoadEvent) {
    console.log('🔥 LAZY LOAD EVENT:', event);
    this.isLoading = true;

    // Extraer y guardar el estado de la tabla
    this.tableState = {
      first: event.first || 0,
      sortField: event.sortField,
      sortOrder: event.sortOrder,
      filters: event.filters,
      rows: event.rows
    };
    if (!this.tableState) {
      this.tableState = {
        first: 0,
        rows: 10,
        filters: {}
      };
    }

    if (!this.tableState.filters) {
      this.tableState.filters = {};
    }

    if (!this.tableState?.filters?.['global']) {
      this.tableState.filters['global'] = { value: '', matchMode: 'contains' };
    }

    localStorage.setItem('dashboardTableState', JSON.stringify(this.tableState));

    // Cargar los datos desde el servicio
    this.lazyTableLoader.load<any>('products', event, 'productsTable').subscribe({
      next: ({ data, total }) => {
        this.products = data;
        this.totalItems = total;
        this.isLoading = false;
      },
      error: () => {
        this.products = [];
        this.totalItems = 0;
        this.isLoading = false;
      }
    });
  }


  statuses = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' },
  ];

  columns_products:TableColumn[] = [
    { field: 'name', header: 'name',sortable: true ,  filter: { type: 'text', placeholder: 'Search by name' }  },
    { field: 'image', header: 'image',sortable: false,     filter: { type: 'text', placeholder: 'Search by Image'}  },
    { field: 'price', header: 'price',sortable: true,     filter: { type: 'text', placeholder: 'Search by Price'}  },
    { field: 'inventoryStatus', header: 'status',sortable: true,
      filter: {
        type: 'custom-select',
        placeholder: 'Filter by status',
        options: this.statuses,
        selectedValue: null, // <-- ¡importante!
        templateType: 'tag'
      }  },
    { field: 'rating', header: 'rating',sortable: true },

  ];

  globalFilterFields = ['name', 'price'];
  selectedProducts: any[] = [];

  rowActions: RowAction[]=[
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
    }
  ];

  editProduct(row: any) {
    console.log('Editando producto:', row);
  }

  deleteProduct(row: any) {
    console.log('Eliminando producto:', row);
  }


  reloadData() {
    console.log('Restaurando valores por defecto del estado de la tabla.');
    // Remueve el estado guardado en localStorage
    localStorage.removeItem('dashboardTableState');

    // Asigna los valores por defecto al tableState
    this.tableState = { first: 0,
      rows: 10,
      filters: {
        name: { value: null, matchMode: 'contains' },
        image: { value: null, matchMode: 'contains' },
        price: { value: null, matchMode: 'contains' },
        inventoryStatus: { value: null, matchMode: 'equals' },
        rating: { value: null, matchMode: 'equals' },
        // Filtro global
      global: { value: '', matchMode: 'contains' }
      } };

    // Llama al método handleProductsLazyLoad con un evento que contenga los valores por defecto
    const defaultEvent: LazyLoadEvent = {
      first: 0,
      rows: 10,
      filters: { ...this.tableState.filters } // si quieres, igualito
    };
    this.handleProductsLazyLoad(defaultEvent);

      // **** Ahora vuelve a sincronizar con tus columnas (igual que en ngOnInit)
  this.columns_products.forEach((col) => {
    if (col.filter) {
      const filterValue = this.tableState?.filters?.[col.field]?.value || null;
      col.filter.selectedValue = filterValue;
    }
  });
  }
  handlePageChange(event: any){
    console.log('handlePageChange (use without lazy)...',event);

  }

  handleCheckBoxAction(event: any){
    console.log('handleCheckBoxAction...',event);
    this.selectedProducts = event;
  }

  getSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
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
*/
}
