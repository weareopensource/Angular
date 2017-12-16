import { ShowSidenavState } from './show-sidenav.state';
import { MenuItemsState } from './menu-items.state';

export interface CoreState {
  readonly showSidenav: ShowSidenavState;
  readonly menuItems: MenuItemsState;
}
