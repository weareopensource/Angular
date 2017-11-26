export interface CoreMenuItem {
  name: string;
  link: string;
  icon: string;
  roles: string[];
}

export interface CoreMenuItemsState {
  [name: string]: CoreMenuItem;
}

export type CoreShowSidenavState = boolean;

export interface CoreState {
  readonly showSidenav: CoreShowSidenavState;
  readonly menuItems: CoreMenuItemsState;
}