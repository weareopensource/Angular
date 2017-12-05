import {
  ActionReducer,
  MetaReducer,
  ActionReducerMap
} from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';  
import { environment } from 'environments/environment';
// import { storeFreeze } from 'ngrx-store-freeze';
import { AppState } from './app.interfaces';

function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, /*storeFreeze*/]
  : [];

export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
};