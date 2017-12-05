import * as CoreActions from './core.actions';
import { initialCoreMenuItemsState, initialShowSidenavState } from './core.init';
import { CoreState, CoreShowSidenavState, CoreMenuItemsState } from './core.interfaces';

function coreMenuItemsReducer(state = initialCoreMenuItemsState, action: CoreActions.Actions): CoreMenuItemsState {
  switch (action.type) {
    case CoreActions.ADD_MENU_ITEM:
      return Object.assign(state, { [action.payload.name.toLowerCase()]: action.payload });
    default:
      return state;
  }
} 

function coreShowSidenavReducer(state = initialShowSidenavState, action: CoreActions.Actions): CoreShowSidenavState
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
