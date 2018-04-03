import * as fromUser from './user.actions';
import { userAdapter, UserState } from './user.interfaces';
import { fromAuthentication } from '@labdat/authentication-state';

export const userInitialState: UserState = userAdapter.getInitialState({
  loading: false,
  loaded: false
});
export function userReducer(
  state: UserState = userInitialState,
  action: fromUser.Actions | fromAuthentication.Actions
): UserState {
  switch (action.type) {
    case fromUser.LOAD: {
      return { ...state, loading: true };
    }
    case fromUser.LOAD_SUCCESS: {
      return userAdapter.addAll(action.payload.users, { ...state, loading: false, loaded: true });
    }

    case fromAuthentication.LOGOUT: {
      //      return adapter.removeAll({ ...state, selectedUserId: null });
      return userInitialState;
    } /*
    case user.HANDLE_SUCCESS: {
      return {
        users: {
          ...state.users,
          ...keyBy(action.payload.users, 'id'),
        }
      };
    }*/
    case fromUser.ADD_SUCCESS: {
      return userAdapter.addOne(action.payload.user, state);
    }

    case fromUser.UPDATE_SUCCESS: {
      return userAdapter.updateOne(action.payload.user, state);
    }

    case fromUser.DELETE_SUCCESS: {
      return userAdapter.removeOne(action.payload.userId, state);
    }

    case fromUser.DELETE_FAILURE: {
      return state;
    }

    default: {
      return state;
    }
  }
}
