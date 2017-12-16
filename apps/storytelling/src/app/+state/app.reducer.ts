import { ActionReducer, MetaReducer } from "@ngrx/store";
import { ApplicationState } from "./app.state";
import { environment } from "../../environments/environment";
import { storeFreeze } from 'ngrx-store-freeze';

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