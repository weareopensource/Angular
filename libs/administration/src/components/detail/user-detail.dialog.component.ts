import { Component } from '@angular/core';
import { fromRouter } from '@labdat/common/router-state';
import { Store } from '@ngrx/store';
import { selectSelectedUser } from '../../+state/user.selectors';

@Component({
  templateUrl: './user-detail.dialog.component.html',
  styleUrls: ['./user-detail.dialog.component.scss']
})
export class UserDetailDialogComponent {

  constructor(private store: Store<any>) { }

  public selectedUser$ = this.store.select(selectSelectedUser);

  back(): void {
    this.store.dispatch(new fromRouter.Back());
  }
}
