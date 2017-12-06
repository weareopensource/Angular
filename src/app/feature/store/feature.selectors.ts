import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureState } from './feature.interfaces';

@Injectable()
export class FeatureSelectors {
  public getGreetings;
  constructor() {
    const getFeatureState = createFeatureSelector<FeatureState>('feature');
    this.getGreetings = createSelector(
      getFeatureState,
      (state: FeatureState) => state.greetings
    );
  }
}
