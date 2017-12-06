import * as FeatureActions from './feature.actions';
import { FeatureState } from './feature.interfaces';

const initialFeatureState: FeatureState = { greetings: '' }

export function featureReducer(state: FeatureState = initialFeatureState, action: FeatureActions.Actions): FeatureState {
  switch (action.type) {
    case FeatureActions.INIT_GREETINGS:
      return {
        ...state,
        greetings: action.payload
      }
    default:
      return state;
  }
}