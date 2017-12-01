import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from './app.interfaces';
import { RouterReducerState } from '@ngrx/router-store';

const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const getCurrentUrl = createSelector(getRouterState, (state: RouterReducerState<RouterStateUrl>) => state.state && state.state.url);
