import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddDialogComponent } from './user-add.dialog.component';
import { UserState } from '../../+state/user.interfaces';
import * as fromUser from '../../+state/user.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../models/user.model';
import { fromRouter } from '@labdat/common/router-state';

@Component({
  template: ''
})
export class UserAddComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;

  constructor(public dialog: MatDialog, private store: Store<UserState>) { }

  ngOnInit(): void {
    setTimeout(() => {
      const dialogRef = this.dialog.open(UserAddDialogComponent, {
        width: '700px'
      });

      const closeDialogSubscription = dialogRef
      .afterClosed()
      .subscribe((userModel: User) => {
        if (userModel) {
          this.store.dispatch(new fromUser.Add({ user: userModel }));
        }
        this.store.dispatch(new fromRouter.Back());
      });
      this.subscriptions = closeDialogSubscription;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
