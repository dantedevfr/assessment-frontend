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
  products: any[] = [];
  totalItems = 0;
  isLoading = false;
  tableState: TableState | null = null;

  constructor(private lazyTableLoader: LazyTableLoaderService) {}

  ngOnInit() {
    const stateJson = localStorage.getItem('dashboardTableState');
    if(stateJson) {
      this.tableState = JSON.parse(stateJson);
      // Opcional: actualizar también sortField, sortOrder, etc.
      this.handleProductsLazyLoad(this.tableState as any);
    } else {
      // Si no hay estado guardado, puede que inicies con los valores por defecto
      this.tableState = { first: 0, filters: {},rows:10 };
    }
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
        rating: { value: null, matchMode: 'equals' }
      } };

    // Llama al método handleProductsLazyLoad con un evento que contenga los valores por defecto
    const defaultEvent: LazyLoadEvent = { first: 0,
      rows: 10,
      filters: {
        name: { value: null, matchMode: 'contains' },
        image: { value: null, matchMode: 'contains' },
        price: { value: null, matchMode: 'contains' },
        inventoryStatus: { value: null, matchMode: 'equals' },
        rating: { value: null, matchMode: 'equals' }
      } };
    this.handleProductsLazyLoad(defaultEvent);
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

}
