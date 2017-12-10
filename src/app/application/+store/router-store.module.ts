import {
  ActionReducer,
  MetaReducer,
  ActionReducerMap, 
  StoreModule} from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';  
// import { storeFreeze } from 'ngrx-store-freeze';
import { Injectable, NgModule } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { Params } from '@angular/router';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;
    const params = route.params;
    return { url, params, queryParams };
  }
}

@Injectable()
export class RouterSelectors {
  public getCurrentUrl;
  constructor() {
    const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
    this.getCurrentUrl = createSelector(getRouterState, (state: RouterReducerState<RouterStateUrl>) => state.state && state.state.url);    
  }
}

@NgModule({
  imports: [
    StoreModule.forFeature('router', routerReducer),
    StoreRouterConnectingModule,
    // DBModule.provideDB(schema),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    RouterSelectors
  ],
})
export class RouterStoreModule { }
  


