import { User } from 'app/authentication';

export interface StatusState {
  loggedIn: boolean;
  user: User | null;
  tokenExpiresIn: number | null;
}
