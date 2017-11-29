import * as fromRoot from 'app/store/app';
import * as fromStatus from './reducers/status';
import * as fromLoginPage from './reducers/login-page';

export interface AuthenticationState {
  status: fromStatus.State;
  loginPage: fromLoginPage.State;
}
  
export interface State extends fromRoot.State {
  authentication: AuthenticationState;
}