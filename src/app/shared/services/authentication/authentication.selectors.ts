import { Injectable } from '@angular/core';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StatusState, LoginPageState, AuthenticationState } from '../../store/authentication';

@Injectable()
export class AuthenticationSelectors {

  public getLoggedIn;
  public getUser;
  public getLoginPageError;
  public getLoginPagePending;

  constructor() {
    const selectAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');
    const selectAuthStatusState = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.status);
    const selectLoginPageState = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.loginPage);
    
    this.getLoggedIn = createSelector(selectAuthStatusState, (state: StatusState) => state.loggedIn);
    this.getUser = createSelector(selectAuthStatusState, (state: StatusState) => state.user);
    this.getLoginPageError = createSelector(selectLoginPageState, (state: LoginPageState) => state.error);
    this.getLoginPagePending = createSelector(selectLoginPageState, (state: LoginPageState) => state.pending);
  }
}
