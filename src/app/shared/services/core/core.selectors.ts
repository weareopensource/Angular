import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from 'app/shared/store/core';

@Injectable()
export class CoreSelectors {
  public getShowSidenav;
  constructor() {
    const getCoreState = createFeatureSelector<CoreState>('core');
    this.getShowSidenav = createSelector(
      getCoreState,
      (state: CoreState) => state.showSidenav
    );
  }
}
