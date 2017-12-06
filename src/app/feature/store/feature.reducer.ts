import * as FeatureActions from './feature.actions';
import { FeatureState } from './feature.interfaces';

const initialFeatureState: FeatureState = { greeting: '' }

export function featureReducer(state: FeatureState = initialFeatureState, action: FeatureActions.Actions): FeatureState {
  switch (action.type) {
    case FeatureActions.INIT_GREETINGS:
      return {
        ...state,
        greeting: action.payload
      }
    default:
      return state;
  }
}