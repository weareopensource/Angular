import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from './user-edit.dialog.component';
import { fromUser, selectSelectedUser, UserState } from '@labdat/user-state';
import { Store } from '@ngrx/store';
import { fromRouter } from '@labdat/router-state';
import { User } from '@labdat/data-models';
import { first } from 'rxjs/operators/first';
import { Subscription } from 'rxjs/Subscription';
import { delay } from 'rxjs/operators/delay';
import { cloneDeep } from 'lodash';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { tap } from 'rxjs/operators/tap';

@Component({
  selector: 'app-user-edit',
  template: ''
})
export class UserEditComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;

  constructor(public dialog: MatDialog, private store: Store<UserState>) { }

  ngOnInit(): void {
    const dialogSubscription = this.store.select(selectSelectedUser)
    .pipe(
      first(),
      delay(0),
      tap(console.log),
      map(user => this.dialog.open(UserEditDialogComponent, {
        width: '700px',
        data: { user: cloneDeep(user) }
      })),
      switchMap(dialogRef => dialogRef.afterClosed())
    )
    .subscribe((userModel: User) => {
      if (userModel) {
        this.store.dispatch(new fromUser.Update({ user: { id: userModel.id, changes: userModel } }));
      }
      this.store.dispatch(new fromRouter.Back());
    });
    this.subscriptions = dialogSubscription;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
