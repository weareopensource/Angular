import { Component } from '@angular/core';
import { fromRouter } from '@labdat/common/router-state';
import { Store } from '@ngrx/store';
import { selectSelectedUser } from '../../+state/user.selectors';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  public comments$: Observable<Array<any>>;

  constructor(private store: Store<any>) {}
  public selectedUser$ = this.store.select(selectSelectedUser);

  back(): void {
    this.store.dispatch(new fromRouter.Back());
  }
}
