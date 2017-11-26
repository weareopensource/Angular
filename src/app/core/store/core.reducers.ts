import * as CoreActions from './core.actions';
import { CoreState, CoreShowSidenavState, CoreMenuItemsState } from './core.interfaces';
import { keyBy } from 'lodash';

function coreMenuItemsReducer(state: CoreMenuItemsState = {}, action: CoreActions.Actions): CoreMenuItemsState {
  switch (action.type) {
    case CoreActions.ADD_MENU_ITEMS:
      return {
        ...state,
        ...keyBy(action.payload, 'order')
      };
    default:
      return state;
  }
}

function coreShowSidenavReducer(state: CoreShowSidenavState = false, action: CoreActions.Actions): CoreShowSidenavState
 {
  switch (action.type) {
    case CoreActions.CLOSE_SIDENAV:
      return false;
    case CoreActions.OPEN_SIDENAV:
      return true;
    default:
      return state;
  }
}

export const coreReducers = {
  showSidenav: coreShowSidenavReducer,
  menuItems: coreMenuItemsReducer
}
