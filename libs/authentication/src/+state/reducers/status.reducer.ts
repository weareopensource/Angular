import * as fromAuthentication from '../actions/authentication-state.actions';
import { StatusState } from '../states/status.state';

const initialStatusState: StatusState = {
  loggedIn: false,
  user: undefined
};

export function statusReducer(state = initialStatusState, action: fromAuthentication.Actions): StatusState {
  switch (action.type) {
    case fromAuthentication.USER_LOAD_SUCCESS:
    case fromAuthentication.REGISTER_SUCCESS:
    case fromAuthentication.LOGIN_SUCCESS: {

      return {
        ...state,
        loggedIn: true,
        user: action.payload.user
      };
    }
    case fromAuthentication.LOGOUT: {

      return {
        ...state,
        ...initialStatusState
      };
    }
    case fromAuthentication.USER_UPDATE_SUCCESS: {
      return {
        ...state,
        user: action.payload.user
      };
    }
    default: {
      return state;
    }
  }
}
