import { Component } from '@angular/core';
import { DashboardMetricsComponent } from '../../components/dashboard-metrics/dashboard-metrics.component';
import { CommonTableComponent } from '../../../../shared/components/common-table/common-table.component';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RowAction, TableColumn } from '../../../../shared/models/table.model';
import { ApiClientService } from '../../../../core/services/api-client.service';
import { FilterQuery, QueryParams } from '../../../../core/models/query-params.model';
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

  constructor(private api: ApiClientService) {}

  handleLazyLoad(event: any) {
    console.log('🔥 LAZY LOAD EVENT:', event);

    const filters: FilterQuery[] = [];

    // 🔍 Global filter
    const globalValue = event.filters?.global?.value;
    if (globalValue) {
      filters.push({ field: 'q', value: globalValue, matchMode: 'contains' });
    }

    // 📊 Column filters
    for (const key in event.filters) {
      if (key === 'global') continue;

      const filterMeta = event.filters[key];
      if (filterMeta?.value !== null && filterMeta?.value !== '') {
        filters.push({
          field: key,
          value: filterMeta.value,
          matchMode: filterMeta.matchMode || 'contains'
        });
      }
    }

    const query: QueryParams = {
      page: event.first / event.rows + 1,
      limit: event.rows,
      sortBy: event.sortField,
      sortOrder: event.sortOrder === 1 ? 'asc' : 'desc',
      filters
    };

    this.isLoading = true;
    this.api.getList<Product>('productss', query).subscribe({
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

/*
  handleLazyLoad(event: any) {
    console.log('LAZY LOAD FIRED 🔥', event);



    const page = (event.first / event.rows) + 1;
    const limit = event.rows;
    const sortField = event.sortField;
    const sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';

    const params: any = {
      _page: page,
      _limit: limit
    };


    if (sortField) {
      params._sort = sortField;
      params._order = sortOrder;
    }

    // 🔍 Filtros
    if (event.filters) {
      for (const field in event.filters) {
        const value = event.filters[field].value;

        // Global filter => use json-server's ?q=
        if (field === 'global' && value) {
          params['q'] = value;
        }

        // Column-specific filters
        else if (value) {
          if (typeof value === 'string') {
            params[`${field}_like`] = value;
          } else {
            params[field] = value;
          }
        }
      }
    }

    this.isLoading = true;
    this.http.get<any[]>('http://localhost:3000/products', {
      params,
      observe: 'response'
    }).subscribe(res => {
      this.products = res.body || [];
      this.totalItems = +res.headers.get('X-Total-Count')!;
      this.isLoading = false;
    });
  }
*/
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
