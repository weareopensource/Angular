import { UserDetailDialogComponent } from './user-detail.dialog.component';
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

@Component({
  selector: 'app-user-detail',
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
      map(user => this.dialog.open(UserDetailDialogComponent, {
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
