import { coreReducers } from './core.reducers';
import { coreInitialState } from './core.init';
import { CoreState } from './core.interfaces';
import * as CoreActions from './core.actions';

describe('productsReducer', () => {
  it('should work', () => {
    const state: CoreState = { showSidenav: false };
    const action = new CoreActions.OpenSidenav();
    const actual = coreReducer(state, action);
    expect(actual).toEqual({ showSidenav: true });
  });
});
