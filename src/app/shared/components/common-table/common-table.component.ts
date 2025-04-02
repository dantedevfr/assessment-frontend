import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Filters } from '../../models/table-filters.model';
import { TableHeader } from '../../models/common-table.model';
//import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
//import { AppStateModel } from 'src/app/stores/AppState.model';
//import { addFilter, deleteFilterData, updateFilterProperty } from 'src/app/stores/filters/filter.actions';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';

@Component({
  selector: 'app-common-table',
  imports: [],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent {
  @Input() titleTable:  string = "";
  @Input() datas: any[] = [];
  @Input() columns: TableHeader[] = [];
  @Input() loadingValue: boolean = true;
  @Input() rowsPerPageOptions: any = [];
  @Input() dataKeyValue: string = "";
  @Input() actions: MenuItem[] = [];
  @ViewChild('menu') menu: TieredMenu | undefined; // Declara la propiedad menu y la decoración @ViewChild

  
  selectedRows: any[] = [];
  selectAll: boolean = false;
  searchValue: string = "";
  withCheckBox: boolean = false;

  storeFilters: Filters = {
    filters: [],
    currentPage: 0,
    pageSize: 0,
    sortField: "",
    sortOrder: true,
    totalRecords: 0,
  }; 

  //event sendend to parent compoenent
  @Output() loadDataEvent: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store<AppStateModel>) { }

  ngOnInit() {
    // Suscribirse al observable y obtener los datos del store cuando cambien
    this.store.select(state => state.storeFilters).subscribe(filters => {
      this.storeFilters = filters; // Almacenar los datos del store en la variable
    });

  }

  loadData(event: any) {
    const pageSize =event?.rows;  //this.storeFilters?.pageSize !== undefined ? this.storeFilters?.pageSize : 5;
    const first = event?.first || 0;
    const pageNumber = Math.ceil((first + 1) / pageSize);
    
    this.store.dispatch(updateFilterProperty({ key: "currentPage", value: pageNumber }))
    this.store.dispatch(updateFilterProperty({ key: "sortField", value: event?.sortField }))
    this.store.dispatch(updateFilterProperty({ key: "sortOrder", value: event?.sortOrder == 1 ? true : false }))
    this.store.dispatch(updateFilterProperty({ key: "pageSize", value: event?.rows ? event?.rows : 5 }))
    this.buildFilterParams(event.filters);
    this.loadDataEvent.emit();
  }

  buildFilterParams(filters: any) {
    //if contains q guardar q and do normal
    const filterParams = []; // Copiar los filtros existentes ...this.storeFilters.filters

    const storeFilters = this.storeFilters.filters; // Obtener los filtros existentes

    // Iterar sobre los filtros existentes y agregar los que tienen matchMode "q"
    for (const filter of storeFilters) {
      if (filter.matchMode === "q") {
        filterParams.push({
          dataKey: filter.dataKey,
          value: filter.value,
          matchMode: filter.matchMode
        });
      }
    }


    for (const key in filters) {

      if (filters.hasOwnProperty(key) && filters[key].value !== null) {
        const existingIndex = filterParams.findIndex(filter => filter.dataKey === key);
        if (existingIndex !== -1) {
          // Si el filtro ya existe, actualizar su valor
          filterParams[existingIndex].value = filters[key].value;
        } else {
          filterParams.push({
            dataKey: key,
            value: filters[key].value,
            matchMode: filters[key].matchMode
          });
        }

      }
    }
    this.store.dispatch(deleteFilterData());
    this.store.dispatch(addFilter({ filters: filterParams }));
  }

  generalSearch(table: Table) {
    table.clear();
    const filterSearch = this.storeFilters.filters.find(filter => filter.dataKey === 'q' && filter.matchMode === 'q');
    const newFilter = {
      dataKey: "q",
      value: this.searchValue,
      matchMode: "q"
    };
  
    // Eliminar todos los filtros existentes
    this.store.dispatch(deleteFilterData());
  
    // Agregar el nuevo filtro o actualizar el filtro existente
    if (filterSearch) {
      this.store.dispatch(addFilter({ filters: [newFilter] }));
    } else {
      this.store.dispatch(addFilter({ filters: [newFilter, ...this.storeFilters.filters] }));
    }
  
    // Despachar la acción para actualizar la página actual a 1 y emitir el evento loadDataEvent
    this.store.dispatch(updateFilterProperty({ key: "currentPage", value: 1 }));
    this.loadDataEvent.emit();
  }



  onSelectionChange(value = []) {
    this.selectAll = value.length === this.storeFilters.totalRecords;
    this.selectedRows = value;
  }

  onSelectAllChange(event: any) {
    const checked = event.checked;
    if (checked) {
      this.selectedRows = this.datas;
      this.selectAll = true;
    } else {
      this.selectedRows = [];
      this.selectAll = false;
    }
  }

  clear(table: Table) {
    this.searchValue = "";
    this.store.dispatch(deleteFilterData());
    table.clear();
  }

  onKey(event: any) {
    this.searchValue = event.target.value;
  }


  getCellValue(item: any, fieldName: string): any {
    return item[fieldName];
  }


  @Output() menuItemClick: EventEmitter<any> = new EventEmitter();

  toggleMenu(event: Event, data:any) {    
    if (this.menu) {
        this.menuItemClick.emit(data); // Emitir el valor de data cuando se hace clic en un elemento del menú
        this.menu.toggle(event);
    }
}



}
