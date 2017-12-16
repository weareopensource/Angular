import * as fromAuthentication from '../actions/authentication-state.actions';
import { LoginPageState } from '../states/login-page.state';

const initialLoginPageState: LoginPageState = {
  error: null,
  pending: false
};

export function loginPageReducer(state = initialLoginPageState, action: fromAuthentication.Actions): LoginPageState {
  switch (action.type) {
    case fromAuthentication.LOGIN: {
      return {
        ...state,
        error: null,
        pending: true
      };
    }
    case fromAuthentication.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false
      };
    }
    case fromAuthentication.LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    }
    default: {
      return state;
    }
  }
}
