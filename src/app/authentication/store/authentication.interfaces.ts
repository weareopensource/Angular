import { AppState } from 'app/store';
import { User } from '../models';

export interface StatusState {
  loggedIn: boolean;
  user: User | null;
}

export interface LoginPageState {
  error: string | null;
  pending: boolean;
}

export interface AuthenticationState {
  status: StatusState;
  loginPage: LoginPageState;
}
/*
export interface State extends AppState {
  authentication: AuthenticationState;
}
*/