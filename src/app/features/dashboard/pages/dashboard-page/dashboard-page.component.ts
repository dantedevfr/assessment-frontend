import { Component } from '@angular/core';
import { DashboardMetricsComponent } from '../../components/dashboard-metrics/dashboard-metrics.component';
import { CommonTableComponent } from '../../../../shared/components/common-table/common-table.component';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

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
  data = [
    { id: 1, name: 'Juan', email: 'juan@mail.com' },
    { id: 2, name: 'Ana', email: 'ana@mail.com' },
  ];

  products = [
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
