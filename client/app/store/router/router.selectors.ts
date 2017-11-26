import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from './router.state';
import { RouterReducerState } from '@ngrx/router-store';

export const getRouterState = createFeatureSelector<RouterReducerState<fromRouter.RouterStateUrl>>('router');

export const getCurrentUrl = createSelector(getRouterState, (state: RouterReducerState<fromRouter.RouterStateUrl>) => state.state && state.state.url);