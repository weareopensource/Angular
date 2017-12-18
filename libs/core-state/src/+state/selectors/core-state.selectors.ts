import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from '../states/core-state.state';

const getCoreState = createFeatureSelector<CoreState>('core');
export const getShowSidenav = createSelector(getCoreState, (state: CoreState) => state.showSidenav);
export const getMenuItems = createSelector(getCoreState, (state: CoreState) => state.menuItems);
