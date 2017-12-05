import { CoreMenuItemsState, CoreShowSidenavState, CoreState } from './core.interfaces';

export const initialCoreMenuItemsState: CoreMenuItemsState = {
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

export const initialShowSidenavState: CoreShowSidenavState = false;

export const initialCoreState: CoreState = {
  showSidenav: initialShowSidenavState,
  menuItems: initialCoreMenuItemsState
};