import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';
import { Authenticate } from '../../models/authenticate.model';

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
export const CHANGE_PASSWORD = '[Auth] Change Password';
export const CHANGE_PASSWORD_SUCCESS = '[Auth] Change Password Success';
export const CHANGE_PASSWORD_FAILURE = '[Auth] Change Password Failure';
export const RESET_PASSWORD = '[Auth] Reset Password';
export const RESET_PASSWORD_SUCCESS = '[Auth] Reset Password Success';
export const RESET_PASSWORD_FAILURE = '[Auth] Reset Password Failure';

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
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordFailure
  | ResetPassword
  | ResetPasswordSuccess
  | ResetPasswordFailure
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

export class ChangePassword implements Action {
  readonly type = CHANGE_PASSWORD;
  constructor(public payload?: { email: string }) {}
}

export class ChangePasswordSuccess implements Action {
  readonly type = CHANGE_PASSWORD_SUCCESS;
  constructor(public payload?: any) {}
}

export class ChangePasswordFailure implements Action {
  readonly type = CHANGE_PASSWORD_FAILURE;
  constructor(public payload?: any) {}
}

export class ResetPassword implements Action {
  readonly type = RESET_PASSWORD;
  constructor(public payload: { newPassword: string, token: string }) {}
}

export class ResetPasswordSuccess implements Action {
  readonly type = RESET_PASSWORD_SUCCESS;
  constructor(public payload?: any) {}
}

export class ResetPasswordFailure implements Action {
  readonly type = RESET_PASSWORD_FAILURE;
  constructor(public payload?: any) {}
}
