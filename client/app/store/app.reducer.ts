import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'environments/environment';
import { routerReducer } from '@ngrx/router-store';

// import { storeFreeze } from 'ngrx-store-freeze';
import { State } from './app.state';

export const reducer: ActionReducerMap<State> = {
  routerReducer: routerReducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, /*storeFreeze*/]
  : [];
