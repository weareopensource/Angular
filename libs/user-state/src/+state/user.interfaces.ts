import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '@labdat/data-models';

export interface UserState extends EntityState<User> {
  loading: boolean;
  loaded: boolean;
}
export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();
