import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthenticationState } from './authentication.state';
import * as fromStatus from './reducers/status';
import * as fromLoginPage from './reducers/login-page';

export const selectAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');

export const selectAuthStatusState = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.status);
export const getLoggedIn = createSelector(selectAuthStatusState, (state: fromStatus.State) => state.loggedIn);
export const getUser = createSelector(selectAuthStatusState, (state: fromStatus.State) => state.user);

export const selectLoginPageState = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.loginPage);
export const getLoginPageError = createSelector(selectLoginPageState, (state: fromLoginPage.State) => state.error);
export const getLoginPagePending = createSelector(selectLoginPageState, (state: fromLoginPage.State) => state.pending);
