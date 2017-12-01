import { Injectable } from '@angular/core';
import * as CoreActions from 'app/core/store/core.actions';
import * as CoreSelectors from 'app/core/store/core.selectors';
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
