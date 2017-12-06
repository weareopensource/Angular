import { featureReducer } from './feature.reducer';
import { featureInitialState } from './feature.init';
import { FeatureState } from './feature.interfaces';
import * as CoreActions from './feature.actions';

describe('productsReducer', () => {
  it('should work', () => {
    const state: FeatureState = { showSidenav: false };
    const action = new CoreActions.OpenSidenav();
    const actual = coreReducer(state, action);
    expect(actual).toEqual({ showSidenav: true });
  });
});
