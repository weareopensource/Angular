import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from './core.interfaces';

export const getCoreState = createFeatureSelector<CoreState>('core');

export const getShowSidenav = createSelector(
  getCoreState,
  (state: CoreState) => state.showSidenav
);