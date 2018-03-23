import { Action } from '@ngrx/store';
import { Authenticate, User } from '@labdat/data-models';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const REGISTER = '[Auth] Register';
export const REGISTER_SUCCESS = '[Auth] Register Success';
export const REGISTER_FAILURE = '[Auth] Register Failure';
export const LOGOUT = '[Auth] Logout';
export const LOAD_USER = '[Auth] Load User';
export const USER_LOAD_SUCCESS = '[Auth] User Load Success';
export const USER_LOAD_FAILURE = '[Auth] User Load Failure';
export const UPDATE_USER = '[Auth] Update User';
export const USER_UPDATE_SUCCESS = '[Auth] User Update Success';
export const USER_UPDATE_FAILURE = '[Auth] User Update Failure';

export type Actions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Register
  | RegisterSuccess
  | RegisterFailure
  | Logout
  | LoadUser
  | UserLoadSuccess
  | UserLoadFailure
  | UpdateUser;

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: { user: User; tokenExpiresIn: number }) {}
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;
  constructor(public payload?: any) {}
}

export class Register implements Action {
  readonly type = REGISTER;
  constructor(public payload: Authenticate) {}
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;
  constructor(public payload: { user: User; tokenExpiresIn: number }) {}
}

export class RegisterFailure implements Action {
  readonly type = REGISTER_FAILURE;
  constructor(public payload?: any) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload?: any) {}
}

export class LoadUser implements Action {
  readonly type = LOAD_USER;
}

export class UserLoadSuccess implements Action {
  readonly type = USER_LOAD_SUCCESS;
  constructor(public payload: { user: User }) { }
}

export class UserLoadFailure implements Action {
  readonly type = USER_LOAD_FAILURE;
  constructor(public payload: any) { }
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload: { user: User }) {}
}

export class UserUpdateSuccess implements Action {
  readonly type = USER_UPDATE_SUCCESS;
  constructor(public payload: { user: User }) {}
}

export class UserUpdateFailure implements Action {
  readonly type = USER_UPDATE_FAILURE;
  constructor(public payload?: any) {}
}
