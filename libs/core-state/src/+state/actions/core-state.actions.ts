import { Action } from '@ngrx/store';
import { MenuItem } from '@labdat/data-models';

export const OPEN_SIDENAV = '[Core] Open Sidenav';
export const CLOSE_SIDENAV = '[Core] Close Sidenav';
export const ADD_MENU_ITEMS = '[Core] Add Menu Items';

export class OpenSidenav implements Action {
  readonly type = OPEN_SIDENAV;
}

export class CloseSidenav implements Action {
  readonly type = CLOSE_SIDENAV;
}

export class AddMenuItems implements Action {
  readonly type = ADD_MENU_ITEMS;
  constructor(public payload: MenuItem[]) {}
}

export type Actions = OpenSidenav | CloseSidenav | AddMenuItems;
