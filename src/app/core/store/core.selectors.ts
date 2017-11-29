import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCore from './core.state';

export const getCoreState = createFeatureSelector<fromCore.State>('core');

export const getShowSidenav = createSelector(
  getCoreState,
  (state: fromCore.State) => state.showSidenav
);