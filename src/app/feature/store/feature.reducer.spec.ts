import { featureReducer } from './feature.reducer';
import { FeatureState } from './feature.interfaces';
import * as CoreActions from './feature.actions';

describe('productsReducer', () => {
  it('should work', () => {
    const state: FeatureState = { greetings: '' };
    const action = new CoreActions.InitGreetings('Hello');
    const actual = featureReducer(state, action);
    expect(actual).toEqual({ showSidenav: true });
  });
});
