import { Component, HostBinding, ViewChild } from '@angular/core';
import * as action from 'app/authentication/store/authentication.actions';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/store/reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private store: Store<fromRoot.State>) { }

  logout() {
    this.store.dispatch(new action.Logout());
  }

}
