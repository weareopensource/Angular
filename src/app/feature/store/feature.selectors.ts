import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureState } from './feature.interfaces';

@Injectable()
export class FeatureSelectors {
  public getGreeting;
  constructor() {
    const getFeatureState = createFeatureSelector<FeatureState>('feature');
    this.getGreeting = createSelector(
      getFeatureState,
      (state: FeatureState) => state.greeting
    );
  }
}
