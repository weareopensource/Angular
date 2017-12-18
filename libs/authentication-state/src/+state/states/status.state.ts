import { User } from '@labdat/data-models';

export interface StatusState {
  loggedIn: boolean;
  user: User | null;
  tokenExpiresIn: number | null;
}
