import { Injectable } from '@angular/core';
import * as AppActions from '../store/app.actions'
import * as AppSelectors from '../store/app.selectors'
import { NavigationExtras } from '@angular/router';

@Injectable()
export class AppStore {

  public getCurrentUrl = AppSelectors.getCurrentUrl;
  
  go(payload: {
    path: any[];
    query?: object;
    extras?: NavigationExtras; }) {
    return new AppActions.Go(payload);
  }

  back() {
    return new AppActions.Back();
  }

  forward() {
    return new AppActions.Forward();
  }
}
