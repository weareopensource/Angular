import * as AuthenticationAction from './authentication.actions';
import { User } from '../models';
import { StatusState, LoginPageState } from './authentication.interfaces';
import { initialStatusState, initialLoginPageState } from './authentication.init';

export function statusReducer(state = initialStatusState, action: AuthenticationAction.Actions): StatusState {
  switch (action.type) {
    case AuthenticationAction.LOAD_USER:
    case AuthenticationAction.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
      };
    }
    case AuthenticationAction.LOGOUT: {
      return initialStatusState;
    }
    default: {
      return state;
    }
  }
}
  
export function loginPageReducer(state = initialLoginPageState, action: AuthenticationAction.Actions): LoginPageState {
  switch (action.type) {
    case AuthenticationAction.LOGIN: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }
    case AuthenticationAction.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }
    case AuthenticationAction.LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const authenticationReducers = {
  status: statusReducer,
  loginPage: loginPageReducer,
};