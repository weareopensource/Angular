import { Injectable } from '@angular/core';
import * as CoreActions from '../store/core.actions';
import * as CoreSelectors from '../store/core.selectors';
import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

@Injectable()
export class CoreStore {

  constructor() {}

  public getShowSidenav = CoreSelectors.getShowSidenav;

  openSidenav() {
    return new CoreActions.OpenSidenav();
  }
  
  closeSidenav() {
    return new CoreActions.CloseSidenav();
  }
}
