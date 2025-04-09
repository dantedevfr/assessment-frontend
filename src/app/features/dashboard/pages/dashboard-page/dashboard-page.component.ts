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

  constructor(private lazyTableLoader: LazyTableLoaderService) {}

  ngOnInit() {
    // Restaurar eventos si existen

  }

  handleProductsLazyLoad(event: LazyLoadEvent) {
    console.log('🔥 LAZY LOAD EVENT:', event);
    this.isLoading = true;

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


  reloadUsers() {
    console.log('Refrescando datos...');
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
