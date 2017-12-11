import { Action } from '@ngrx/store';
import { User, Authenticate } from 'app/authentication';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const REGISTER = '[Auth] Register';
export const REGISTER_SUCCESS = '[Auth] Register Success';
export const REGISTER_FAILURE = '[Auth] Register Failure';
export const LOGOUT = '[Auth] Logout';
export const LOAD_USER = '[Auth] Load User';

export type Actions =
| Login
| LoginSuccess
| LoginFailure
| Register
| RegisterSuccess
| RegisterFailure
| Logout
| LoadUser
;

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: { user: User, tokenExpiresIn: number }) {}
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
  constructor(public payload: { user: User, tokenExpiresIn: number }) {}
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
  constructor(public payload: { user: User, tokenExpiresIn: number }) {}
}
