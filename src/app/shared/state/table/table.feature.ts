import { provideState } from '@ngrx/store';
import { tableReducer } from './table.reducer';

export const provideTableFeature = provideState({
  name: 'tables',
  reducer: tableReducer,
});
