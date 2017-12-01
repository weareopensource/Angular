import { Injectable } from '@angular/core';
import * as RouterActions from 'app/store/app.actions';
import * as RouterSelectors from 'app/store/app.selectors';
import * as CoreActions from '../store/core.actions';
import * as CoreSelectors from '../store/core.selectors';
import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

@Injectable()
export class CoreStore {

  public getCurrentUrl = RouterSelectors.getCurrentUrl;
  public getShowSidenav = CoreSelectors.getShowSidenav;

  go(path: any[], query?: object, extras?: NavigationExtras) {
    return new RouterActions.Go({ path, query, extras });
  }

  back() {
    return new RouterActions.Back();
  }

  forward() {
    return new RouterActions.Forward();
  }

  openSidenav() {
    return new CoreActions.OpenSidenav();
  }
  
  closeSidenav() {
    return new CoreActions.CloseSidenav();
  }
}
