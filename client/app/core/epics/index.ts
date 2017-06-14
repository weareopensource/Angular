import { SessionEpics } from './session.epics';
import { combineEpics } from 'redux-observable';

export const EPIC_PROVIDERS = [ SessionEpics ];
export { SessionEpics };
