import { Component } from '@angular/core';
import { DashboardMetricsComponent } from '../../components/dashboard-metrics/dashboard-metrics.component';
import { CommonTableComponent } from '../../../../shared/components/common-table/common-table.component';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RowAction } from '../../../../shared/models/table.model';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  loadProductsLazy(event: any) {
    this.isLoading = true;

    let params = new HttpParams()
      .set('_page', (event.first / event.rows + 1).toString())
      .set('_limit', event.rows.toString());

    if (event.sortField) {
      params = params
        .set('_sort', event.sortField)
        .set('_order', event.sortOrder === 1 ? 'asc' : 'desc');
    }

    this.http
      .get<any[]>('http://localhost:3000/products', {
        params,
        observe: 'response'
      })
      .subscribe((res) => {
        this.products = res.body || [];
        const totalCount = res.headers.get('X-Total-Count');
        this.totalItems = totalCount ? +totalCount : 0;
        this.isLoading = false;
      });
  }

  
  data = [
    { id: 1, name: 'Juan', email: 'juan@mail.com' },
    { id: 2, name: 'Ana', email: 'ana@mail.com' },
  ];

 /* products = [
    {
      id:1,
      name: 'Laptop',
      image: 'laptop.png',
      price: 1200,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id:2,
      name: 'Xbox',
      image: 'laptop.png',
      price: 12200,
      inventoryStatus: 'LOWSTOCK',
      rating: 2
    },
    {
      id:3,
      name: 'Laptop',
      image: 'laptop.png',
      price: 1200,
      inventoryStatus: 'LOWSTOCK',
      rating: 4
    },
    {
      id:4,
      name: 'Xbox',
      image: 'laptop.png',
      price: 12200,
      inventoryStatus: 'INSTOCK',
      rating: 2
    },
    {
      id:5,
      name: 'Laptop',
      image: 'laptop.png',
      price: 1200,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id:6,
      name: 'Xbox',
      image: 'laptop.png',
      price: 12200,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 2
    },
    {
      id:7,
      name: 'Laptop',
      image: 'laptop.png',
      price: 1200,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id:8,
      name: 'Laptop',
      image: 'laptop.png',
      price: 1200,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id:9,
      name: 'Laptop',
      image: 'laptop.png',
      price: 1200,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id:10,
      name: 'Laptop',
      image: 'laptop.png',
      price: 1200,
      inventoryStatus: 'LOWSTOCK',
      rating: 4
    },
    {
      id:11,
      name: 'Xbox',
      image: 'laptop.png',
      price: 12200,
      inventoryStatus: 'INSTOCK',
      rating: 2
    },
    {
      id:12,
      name: 'Laptop',
      image: 'laptop.png',
      price: 1200,
      inventoryStatus: 'LOWSTOCK',
      rating: 4
    },
    {
      id:13,
      name: 'Xbox',
      image: 'laptop.png',
      price: 12200,
      inventoryStatus: 'INSTOCK',
      rating: 2
    },
  ];
*/
  columns = [
    { field: 'name', header: 'Nombre' },
    { field: 'email', header: 'Correo' }
  ];
  statuses = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' },
  ];
  
  columns_products = [
    { field: 'name', header: 'name',sortable: true ,  filter: { type: 'text', placeholder: 'Search by name', ariaLabel: 'Filter Name' }  },
    { field: 'image', header: 'image',sortable: false,     filter: { type: 'text', placeholder: 'Search by Image', ariaLabel: 'Filter Image' }  },
    { field: 'price', header: 'price',sortable: true,     filter: { type: 'text', placeholder: 'Search by Price', ariaLabel: 'Filter Price' }  },
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
    console.log('handlePageChange...',event);

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
