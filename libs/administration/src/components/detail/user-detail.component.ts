import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedUser } from '../../+state/user.selectors';
import { first } from 'rxjs/operators/first';
import { delay } from 'rxjs/operators/delay';
import { map } from 'rxjs/operators/map';
import { fromRouter } from '@labdat/common/router-state';
import { switchMap } from 'rxjs/operators/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material/dialog';
import { UserState } from '../../+state/user.interfaces';
import { cloneDeep } from 'lodash';
import * as fromUser from '../../+state/user.actions';
import { User } from '../../models/user.model';
import { ProfileDialogComponent } from '@labdat/authentication';

@Component({
  template: ''
})
export class UserDetailComponent implements OnInit, OnDestroy {

  constructor(public dialog: MatDialog, private store: Store<UserState>) { }

  public selectedUser$ = this.store.select(selectSelectedUser);
  private subscriptions: Subscription;

  back(): void {
    this.store.dispatch(new fromRouter.Back());
  }

  ngOnInit(): void {
    const dialogSubscription = this.store.select(selectSelectedUser)
    .pipe(
      first(),
      delay(0),
      map(user => this.dialog.open(ProfileDialogComponent, {
        height: '700px',
        data: cloneDeep(user)
      })),
      switchMap(dialogRef => dialogRef.afterClosed())
    )
    .subscribe((user: User) => {
      if (user) {
        this.store.dispatch(new fromUser.Update({ user: { id: user.id, changes: user } }));
      }
      this.store.dispatch(new fromRouter.Back());
    });
    this.subscriptions = dialogSubscription;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
