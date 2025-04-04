import { Action, createReducer, on } from '@ngrx/store';
import * as FiltersActions from './table-filter.actions';
import { initialState } from './table-filter.state';

export const filterReducer = createReducer(
  initialState,

  // Actualiza una propiedad específica del estado de filtros
  on(FiltersActions.updateTableFilterProperty, (state, { key, value }) => ({
    ...state,
    [key]: value
  })),

  // Agrega un nuevo filtro al estado de filtros
  on(FiltersActions.addTableFilter, (state, { filters }) => ({
    ...state,
    filters: state.filters ? [...state.filters, ...filters] : [...filters]
  })),
  // Borra los datos de filtros
  on(FiltersActions.deleteTableFilterData, state => ({
    ...state,
    filters: []
  })),

  // Resetea todos los filtros
  on(FiltersActions.resetTableFilterData, () => initialState),

  // Borra un filtro por clave
on(FiltersActions.deleteTableFilterByKey, (state, { key }) => {
  const filters = state.filters ? state.filters.filter(filter => filter.field !== key) : [];
  return {
    ...state,
    filters
  };
})
);

export function reducer(state: any, action: Action) {
  return filterReducer(state, action);
}
