import { Component, OnDestroy, OnInit } from '@angular/core';
import { selectSelectedUser } from '../../+state/user.selectors';
import { UserState } from '../../+state/user.interfaces';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './user-detail.page.component.html',
  styleUrls: ['./user-detail.page.component.scss']
})
export class UserDetailPageComponent implements OnInit, OnDestroy {
  public user: any;
  private subscriptions: Subscription;
  constructor(private _store: Store<UserState>) { }

  ngOnInit(): void {
    this.subscriptions = this._store.select(selectSelectedUser)
    .subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
