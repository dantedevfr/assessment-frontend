import { createAction, props } from '@ngrx/store';
import { TableFilter } from '../../models/table.model';

// Acción para actualizar una propiedad específica del estado de filtros
export const updateTableFilterProperty = createAction(
  '[Filter] Update TableFilter Property',
  props<{ key: string, value: any }>()
);

// Acción para agregar un nuevo filtro al estado de filtros
export const addTableFilter = createAction(
  '[Filter] Add TableFilter',
  props<{ filters: TableFilter[]  }>()
);

// Acción para borrar los datos de filtros
export const deleteTableFilterData = createAction(
  '[Filter] Delete TableFilter Data'
);

// Acción para resetear todos los filtros
export const resetTableFilterData = createAction(
  '[Filter] Reset FTableilter Data'
);

// Acción para borrar un filtro por clave
export const deleteTableFilterByKey = createAction(
  '[Filter] Delete TableFilter By Key',
  props<{ key: string }>()
);


/*

export const updateCurrentPage = createAction(
  '[Filters] Update Current Page',
  props<{ payload: number }>()
);*/
