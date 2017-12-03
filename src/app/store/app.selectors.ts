import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from './app.interfaces';
import { RouterReducerState } from '@ngrx/router-store';

@Injectable()
export class AppSelectors {
  public getCurrentUrl;
  constructor() {
    const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
    this.getCurrentUrl = createSelector(getRouterState, (state: RouterReducerState<RouterStateUrl>) => state.state && state.state.url);    
  }
}
