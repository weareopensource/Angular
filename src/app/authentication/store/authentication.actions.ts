import { Action } from '@ngrx/store';
import { User, Authenticate } from '../models';
import { Injectable } from '@angular/core';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGOUT = '[Auth] Logout';
export const LOAD_USER = '[Auth] Load User';

@Injectable()
export class AuthenticationActions {
  public Login = LOGIN;
  public LoginSuccess = LOGIN_SUCCESS;
  public LoginFailure = LOGIN_FAILURE;
  public Logout = LOGOUT;
  public LoadUser = LOAD_USER;
}

export type Actions =
| Login
| LoginSuccess
| LoginFailure
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

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload?: any) {}
}

export class LoadUser implements Action {
  readonly type = LOAD_USER;
  constructor(public payload: { user: User, tokenExpiresIn: number }) {}
}
