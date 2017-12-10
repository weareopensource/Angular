import * as fromCore from '../actions/core.actions';
import { fromAuthentication } from 'app/authentication/+store';
import { ShowSidenavState } from '../states/show-sidenav.state';

export function showSidenavReducer(state: ShowSidenavState = false, action: fromCore.Actions | fromAuthentication.Actions): ShowSidenavState {
  switch (action.type) {
    case fromAuthentication.LOGOUT:
    case fromCore.CLOSE_SIDENAV:
      return false;
    case fromCore.OPEN_SIDENAV:
      return true;
    default:
      return state;
  }
}