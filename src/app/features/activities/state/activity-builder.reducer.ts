import { createReducer, on } from '@ngrx/store';
import { initialActivityBuilderState } from './activity-builder.state';
import * as ActivityBuilderActions from './activity-builder.actions';

export const activityBuilderReducer = createReducer(
  initialActivityBuilderState,

  on(ActivityBuilderActions.updateActivity, (state, { changes }) => ({
    ...state,
    ...changes
  })),

  on(ActivityBuilderActions.resetActivity, () => ({
    ...initialActivityBuilderState
  }))
);