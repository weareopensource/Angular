import { Component, HostBinding, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import * as fromAuthentication from 'app/authentication/store';
import * as fromCore from '../../store';
import * as fromRoot from 'app/store/app';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) { }

  public sidenavOpened$: Observable<boolean>;

  ngOnInit() {
    this.sidenavOpened$ = this.store.select(fromCore.getShowSidenav)
  }

  openSidenav() {
    this.store.dispatch(new fromCore.OpenSidenav())
  }

  closeSidenav() {
    this.store.dispatch(new fromCore.CloseSidenav())
  }

  logout() {
    this.store.dispatch(new fromAuthentication.Logout());
  }

}
