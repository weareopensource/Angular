import * as fromRoot from 'app/store/reducer';
import * as fromStatus from './status';
import * as fromLoginPage from './login-page';

export interface AuthenticationState {
  status: fromStatus.State;
  loginPage: fromLoginPage.State;
}

export interface State extends fromRoot.State {
  authentication: AuthenticationState;
}

export const reducers = {
  status: fromStatus.reducer,
  loginPage: fromLoginPage.reducer,
};
