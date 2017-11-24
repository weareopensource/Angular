import * as CoreActions from './core.actions';
import * as  fromCore from './core.state';

function layout(state = fromCore.initialState, action: CoreActions.Actions): fromCore.State {
  switch (action.type) {
    case CoreActions.CLOSE_SIDENAV:
      return {
        showSidenav: false,
      };
    case CoreActions.OPEN_SIDENAV:
      return {
        showSidenav: true,
      };
    default:
      return state;
  }
}

export const reducer = {
  layout
};
  