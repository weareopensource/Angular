import { User } from '../../models/user.model';

export interface StatusState {
  loggedIn: boolean;
  user: User | null;
}
