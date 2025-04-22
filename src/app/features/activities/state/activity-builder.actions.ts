import { createAction, props } from '@ngrx/store';
import { ActivityBuilderState } from './activity-builder.state';

export const updateActivity = createAction(
  '[Activity Builder] Update',
  props<{ changes: Partial<ActivityBuilderState> }>()
);

export const resetActivity = createAction(
  '[Activity Builder] Reset'
);