import { User } from '../../../models';

export interface State {
    loggedIn: boolean;
    user: User | null;
  }
  
  export const initialState: State = {
    loggedIn: false,
    user: null,
  };