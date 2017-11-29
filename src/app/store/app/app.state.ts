import { RouterStateUrl } from '../router';
import { RouterReducerState } from '@ngrx/router-store';

export interface State {
    router: RouterReducerState<RouterStateUrl>;
  }