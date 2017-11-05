import { RouterStateUrl } from 'app/shared/utils';
import { RouterReducerState } from '@ngrx/router-store';

export interface State {
    routerReducer: RouterReducerState<RouterStateUrl>;
  }