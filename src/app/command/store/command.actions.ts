import { Action } from '@ngrx/store';
import { Command } from '../models';

export const SHOW = '[Commands] Show';
export const LOAD = '[Commands] Load';
export const LOAD_SUCCESS = '[Commands] Load Success';
export const LOAD_FAILURE = '[Commands] Load Failure';
export const HANDLE = '[Commands] Handle';
export const HANDLE_SUCCESS = '[Commands] Handle Success';
export const HANDLE_FAILURE = '[Commands] Handle Failure';
export const LOGIN_REDIRECT = '[Commands] Login Redirect';

export type Actions =
| Load
| LoadSuccess
| LoadFailure
| Handle
| HandleSuccess
| HandleFailure
;

export class Load implements Action {
  readonly type = LOAD;
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: { [key: string]: Command}) {}
}

export class LoadFailure implements Action {
  readonly type = LOAD_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class Handle implements Action {
  readonly type = HANDLE;
  constructor(public payload: { commandId: Number }) {}
}

export class HandleSuccess implements Action {
  readonly type = HANDLE_SUCCESS;
  constructor(public payload: { command: Command }) {}
}

export class HandleFailure implements Action {
  readonly type = HANDLE_FAILURE;
  constructor(public payload: { error: any }) {}
}
