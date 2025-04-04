import { Component } from '@angular/core';
import { DashboardMetricsComponent } from '../../components/dashboard-metrics/dashboard-metrics.component';
import { CommonTableComponent } from '../../../../shared/components/common-table/common-table.component';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    DashboardMetricsComponent,
    CommonTableComponent,
    TagModule,
    RatingModule,
    FormsModule,
    CommonModule],
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
      name: 'Laptop',
      image: 'laptop.png',
      price: 1200,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      name: 'Xbox',
      image: 'laptop.png',
      price: 12200,
      inventoryStatus: 'INSTOCK',
      rating: 2
    },
    {
      name: 'Laptop',
      image: 'laptop.png',
      price: 1200,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      name: 'Xbox',
      image: 'laptop.png',
      price: 12200,
      inventoryStatus: 'INSTOCK',
      rating: 2
    },
    {
      name: 'Laptop',
      image: 'laptop.png',
      price: 1200,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      name: 'Xbox',
      image: 'laptop.png',
      price: 12200,
      inventoryStatus: 'INSTOCK',
      rating: 2
    },
    {
      name: 'Laptop',
      image: 'laptop.png',
      price: 1200,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      name: 'Xbox',
      image: 'laptop.png',
      price: 12200,
      inventoryStatus: 'INSTOCK',
      rating: 2
    },
    {
      name: 'Laptop',
      image: 'laptop.png',
      price: 1200,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
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

  columns_products = [
    { field: 'name', header: 'name',sortable: true },
    { field: 'image', header: 'image',sortable: false },
    { field: 'price', header: 'price',sortable: true },
    { field: 'inventoryStatus', header: 'status',sortable: true },
    { field: 'rating', header: 'rating',sortable: true },

  ];

  globalFilterFields = ['name', 'price'];


  reloadUsers() {
    console.log('Refrescando datos...');
  }
  handlePageChange(event: any){
    console.log('handlePageChange...',event);

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
