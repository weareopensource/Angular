import * as FromAuth from '../../authentication.actions';
import { initialState, State } from './login-page.state';
export { State };

export function reducer(state = initialState, action: FromAuth.Actions): State {
  switch (action.type) {
    case FromAuth.LOGIN: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }
    case FromAuth.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }
    case FromAuth.LOGIN_FAILURE: {
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
