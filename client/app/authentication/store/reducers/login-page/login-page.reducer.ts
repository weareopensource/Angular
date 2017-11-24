import * as AuthAction from '../../authentication.actions';
import { initialState, State } from './login-page.state';
export { State };

export function reducer(state = initialState, action: AuthAction.Actions): State {
  switch (action.type) {
    case AuthAction.LOGIN: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }
    case AuthAction.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }
    case AuthAction.LOGIN_FAILURE: {
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
