import { LoginPageState, StatusState, AuthenticationState } from './authentication.interfaces';

export const initialLoginPageState: LoginPageState = {
  error: null,
  pending: false,
};

export const initialStatusState: StatusState = {
  loggedIn: false,
  user: null,
};