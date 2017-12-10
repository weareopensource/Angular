import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params,
} from '@angular/router';
import { createFeatureSelector, ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import {
  RouterReducerState,
  routerReducer,
  RouterStateSerializer
} from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from 'environments/environment';
  
export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;  
}
  
export interface ApplicationState {
  router: RouterReducerState<RouterStateUrl>;
}

export const applicationReducer: ActionReducerMap<ApplicationState> = {
  router: routerReducer,
};

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, params, queryParams };
  }
}

function logger(reducer: ActionReducer<ApplicationState>): ActionReducer<ApplicationState> {
  return function(state: ApplicationState, action: any): ApplicationState {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production
  ? [logger, storeFreeze]
  : [];