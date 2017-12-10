import { Injectable } from '@angular/core';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StatusState, LoginPageState, AuthenticationState } from './authentication.interfaces';

@Injectable()
export class AuthenticationSelectorsService {

  public getLoggedIn;
  public getUser;
  public getTokenExpiresIn;
  public getLoginPageError;
  public getLoginPagePending;

  constructor() {
    const selectAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');
    const selectAuthenticationStatusState = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.status);
    const selectLoginPageState = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.loginPage);
    
    this.getLoggedIn = createSelector(selectAuthenticationStatusState, (state: StatusState) => state.loggedIn);
    this.getUser = createSelector(selectAuthenticationStatusState, (state: StatusState) => state.user);
    this.getTokenExpiresIn = createSelector(selectAuthenticationStatusState, (state: StatusState) => state.tokenExpiresIn);
    this.getLoginPageError = createSelector(selectLoginPageState, (state: LoginPageState) => state.error);
    this.getLoginPagePending = createSelector(selectLoginPageState, (state: LoginPageState) => state.pending);
  }
}
