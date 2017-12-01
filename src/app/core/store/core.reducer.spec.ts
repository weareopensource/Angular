import { coreReducer } from './core.reducer';
import { coreInitialState } from './core.init';
import { CoreState } from './core.interfaces';
import * as Actions from './core.actions';

describe('productsReducer', () => {
  it('should work', () => {
    const state: CoreState = { showSidenav: false };
    const action = new Actions.OpenSidenav();
    const actual = coreReducer(state, action);
    expect(actual).toEqual({ showSidenav: true });
  });
});
