import * as CoreActions from './core.actions';
import { coreInitialState } from './core.init';
import { CoreState } from './core.interfaces';

export function coreReducer(state = coreInitialState, action: CoreActions.Actions): CoreState {
  switch (action.type) {
    case CoreActions.CLOSE_SIDENAV:
      return {
        showSidenav: false,
      };
    case CoreActions.OPEN_SIDENAV:
      return {
        showSidenav: true,
      };
    default:
      return state;
  }
}
  