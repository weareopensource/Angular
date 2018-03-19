import { Action } from '@ngrx/store';
import { MenuItem } from '@labdat/data-models';

export const OPEN_SIDENAV = '[Core] Open Sidenav';
export const CLOSE_SIDENAV = '[Core] Close Sidenav';
export const ADD_MENU_ITEMS = '[Core] Add Menu Items';
export const SET_TITLE = '[Core] Set Title';
export const SET_LOGO = '[Core] Set Logo';

export class OpenSidenav implements Action {
  readonly type = OPEN_SIDENAV;
}

export class CloseSidenav implements Action {
  readonly type = CLOSE_SIDENAV;
}

export class AddMenuItems implements Action {
  readonly type = ADD_MENU_ITEMS;
  constructor(public payload: Array<MenuItem>) {}
}

export class SetTitle implements Action {
  readonly type = SET_TITLE;
  constructor(public payload: string) {}
}

export class SetLogo implements Action {
  readonly type = SET_LOGO;
  constructor(public payload: string) {}
}

export type Actions =
  OpenSidenav
| CloseSidenav
| AddMenuItems
| SetTitle
| SetLogo;
