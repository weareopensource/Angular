import { Injectable } from '@angular/core';
import * as fromUser from './user.actions';
import { UserState } from './user.interfaces';
import { Store } from '@ngrx/store';
import { getLoggedIn } from '@labdat/authentication';
import { first } from 'rxjs/operators/first';
import { filter } from 'rxjs/operators/filter';

@Injectable()
export class UserInitializationService {
  constructor(private store: Store<UserState>) {}

  public loadUsers(): void {
    this.store
      .select(getLoggedIn)
      .pipe(first(), filter(isLoggedIn => isLoggedIn))
      .subscribe(() => this.store.dispatch(new fromUser.Load()));
  }
}
