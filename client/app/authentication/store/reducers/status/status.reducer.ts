import * as AuthAction from '../../authentication.actions';
import { User } from '../../../models';
import { State, initialState } from './status.state';
export { State };

export function reducer(state = initialState, action: AuthAction.Actions): State {
  switch (action.type) {
    case AuthAction.LOAD_USER:
    case AuthAction.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
      };
    }
    case AuthAction.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
