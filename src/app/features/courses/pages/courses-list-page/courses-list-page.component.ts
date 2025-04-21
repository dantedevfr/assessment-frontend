import { PRODUCT_COLUMNS,PRODUCT_ACTIONS,PRODUCT_GLOBAL_FILTERS,PRODUCT_TABLE_FILTERS } from '../../../dashboard/config/products-table.config';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../../../counter/components/counter/counter.component';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

import { TableFacadeService } from '../../../../core/services/table-facade-service';
import { getDefaultTableState } from '../../../../shared/state/table/table.utils';
import { CommonTableComponent } from '../../../../shared/components/common-table/common-table.component';
import { map, Observable, take } from 'rxjs';
import { RowAction, TableColumn } from '../../../../shared/models/table.model';
import { LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-courses-list-page',
  standalone: true,
  imports: [
    CommonModule,
    CounterComponent,
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    RatingModule,
    CommonTableComponent
    ],
  templateUrl: './courses-list-page.component.html',
  styleUrl: './courses-list-page.component.scss'
})
export class CoursesListPageComponent {
  private tableId = 'productsTable2';
  private endpoint = 'products';
  private tableService = inject(TableFacadeService);

  // Observables para el template
  tableState$ = this.tableService.getState$(this.tableId);
  products$!: Observable<any[]>;
  isLoading$!: Observable<boolean>;
  totalItems$!: Observable<number>;

  filters$ = this.tableState$.pipe(
    map(state => state?.filters ? JSON.parse(JSON.stringify(state.filters)) : {})
  ); 

  ngOnInit() {
    this.tableService.init(this.tableId, getDefaultTableState({
      filters: PRODUCT_TABLE_FILTERS,
      sortField: 'name',
    }));
    this.products$ = this.tableService.getData$(this.tableId);
    this.isLoading$ = this.tableService.getLoading$(this.tableId);
    this.totalItems$ = this.tableService.getTotalItems$(this.tableId);

    this.tableState$.pipe(take(1)).subscribe((state) => {
      if (state) {
        this.handleLazyLoad(state);
      }
    });
  }

  selectedProducts: any[] = []; 
  columns_products: TableColumn[] = PRODUCT_COLUMNS;
  globalFilterFields = PRODUCT_GLOBAL_FILTERS;

  // Aquí se le inyecta el callback dinámicamente
  rowActions: RowAction[] = PRODUCT_ACTIONS.map(action => ({
    ...action,
    callback: (row: any) => {
      if (action.icon.includes('pencil')) this.editProduct(row);
      if (action.icon.includes('trash')) this.deleteProduct(row);
    }
  }));

  handleLazyLoad(event: LazyLoadEvent) {
    this.tableService.loadData(this.tableId, this.endpoint, event);
  }

  reloadData() {
    this.tableService.reset(this.tableId, getDefaultTableState({
          filters: PRODUCT_TABLE_FILTERS,
          sortField: 'name'
    }));
    this.tableState$.pipe(take(1)).subscribe((state) => {
      if (state) {
        this.handleLazyLoad(state);
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
