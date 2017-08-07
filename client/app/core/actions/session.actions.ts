import { Action } from 'redux';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/core';

@Injectable()
export class SessionActions {
  static LOGIN_USER = 'LOGIN_USER';
  static LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
  static LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
  static LOGOUT_USER = 'LOGOUT_USER';
  static PUT_USER = 'PUT_USER';
  static PUT_USER_SUCCESS = 'PUT_USER_SUCCESS';
  static PUT_USER_ERROR = 'PUT_USER_ERROR';
  static GET_USER = 'GET_USER';
  static GET_USER_SUCCESS = 'GET_USER_SUCCESS';
  static GET_USER_ERROR = 'GET_USER_ERROR';
  static CHANGE_PASSWORD = 'CHANGE_PASSWORD';
  static CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
  static CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';
  static GET_USERS = 'GET_USERS';
  static GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
  static GET_USERS_ERROR = 'GET_USERS_ERROR';
  static TOGGLE_SIDENAV = 'TOGGLE_SIDENAV';

  constructor(private ngRedux: NgRedux<IAppState>) { }

  loginUser(credentials) {
    this.ngRedux.dispatch({
      type: SessionActions.LOGIN_USER,
      payload: credentials,
    });
  };

  logoutUser() {
    return this.ngRedux.dispatch({ type: SessionActions.LOGOUT_USER });
  };

  editProfile(user) {
    this.ngRedux.dispatch({
      type: SessionActions.PUT_USER,
      payload: user,
    });
  }
  getProfile() {
    this.ngRedux.dispatch({
      type: SessionActions.GET_USER,
      payload: {}
    });
  }
  changePassword(passwords) {
    this.ngRedux.dispatch({
      type: SessionActions.CHANGE_PASSWORD,
      payload: passwords
    });
  }
  toggleSideNav() {
    this.ngRedux.dispatch({ type: SessionActions.TOGGLE_SIDENAV });
  }
}

export interface IPayloadAction extends Action {
  payload?: any;
}
