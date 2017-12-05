import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from './core.interfaces';

@Injectable()
export class CoreSelectors {
  public getShowSidenav;
  public getMenuItems;
  constructor() {
    const getCoreState = createFeatureSelector<CoreState>('core');
    this.getShowSidenav = createSelector(
      getCoreState,
      (state: CoreState) => state.showSidenav
    );
    this.getMenuItems = createSelector(
      getCoreState,
      (state: CoreState) => state.menuItems
    );
  }
}
