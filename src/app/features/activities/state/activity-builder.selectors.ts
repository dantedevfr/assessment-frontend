import { createFeatureSelector } from '@ngrx/store';
import { ActivityBuilderState } from './activity-builder.state';

export const selectActivityBuilder =
  createFeatureSelector<ActivityBuilderState>('activityBuilder');