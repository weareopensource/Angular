import * as CoreActions from './core.actions';
import { CoreState, CoreShowSidenavState, CoreMenuItemsState } from './core.interfaces';

const initialCoreMenuItemsState: CoreMenuItemsState = {
  'home': {
    link: '/home',
    name: 'Home',
    icon: 'action:ic_home_24px',
    roles:['user', 'admin']
  },
  'test': {
    link: '/test',
    name: 'Test',
    icon: 'action:ic_pan_tool_24px',
    roles:['user', 'admin']
  }
}

function coreMenuItemsReducer(state = initialCoreMenuItemsState, action: CoreActions.Actions): CoreMenuItemsState {
  switch (action.type) {
    case CoreActions.ADD_MENU_ITEM:
      return {
        ...state,
        [action.payload.name.toLowerCase()]: action.payload
      };
    default:
      return state;
  }
} 

const initialShowSidenavState: CoreShowSidenavState = false;

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
