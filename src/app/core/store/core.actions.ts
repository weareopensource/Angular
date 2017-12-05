import { Action } from '@ngrx/store';

export const OPEN_SIDENAV = '[Core] Open Sidenav';
export const CLOSE_SIDENAV = '[Core] Close Sidenav';
export const ADD_MENU_ITEM = '[Core] Add Menu Item';

export class OpenSidenav implements Action {
  readonly type = OPEN_SIDENAV;
}

export class CloseSidenav implements Action {
  readonly type = CLOSE_SIDENAV;
}

export class AddMenuItem implements Action {
  readonly type = ADD_MENU_ITEM;
  constructor(public payload?: any) {}
}

export type Actions =
  OpenSidenav
| CloseSidenav
| AddMenuItem;