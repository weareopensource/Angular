import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StatusState, LoginPageState, AuthenticationState } from './authentication.interfaces';

const selectAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');

const selectAuthStatusState = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.status);
export const getLoggedIn = createSelector(selectAuthStatusState, (state: StatusState) => state.loggedIn);
export const getUser = createSelector(selectAuthStatusState, (state: StatusState) => state.user);

const selectLoginPageState = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.loginPage);
export const getLoginPageError = createSelector(selectLoginPageState, (state: LoginPageState) => state.error);
export const getLoginPagePending = createSelector(selectLoginPageState, (state: LoginPageState) => state.pending);
