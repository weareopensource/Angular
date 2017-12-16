import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './router-state.state';

const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const getCurrentUrl = createSelector(getRouterState, (state: RouterReducerState<RouterStateUrl>) => state.state && state.state.url);    
