import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { difference, isEmpty, values } from 'lodash';
import { fromCore, getMenuItems, getShowSidenav } from '@labdat/core-state';
import { getLoggedIn, getUser } from '@labdat/authentication-state';
import { map } from 'rxjs/operators/map';
import { routesAnimation } from '@labdat/animations';

@Component({
  selector: 'layout-root',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routesAnimation]
})
export class LayoutComponent implements OnInit {

  @ViewChild('outlet')
  public outlet;

  public menuItems$;
  public isSidenavOpened$ = this.store.select(getShowSidenav);
  public isLoggedIn$ = this.store.select(getLoggedIn);

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    const items$ = this.store.select(getMenuItems);
    const user$ = this.store.select(getUser);
    this.menuItems$ = items$.pipe(
      combineLatest(user$),
      map(([items, user]) =>
        values(items)
        .filter(item => isEmpty(item.roles) || (user && !isEmpty(difference(item.roles, user.roles))))
        .filter(item => !isEmpty(item))
      )
    );
  }

  public openSidenav(): void {
    this.store.dispatch(new fromCore.OpenSidenav());
  }

  public closeSidenav(): void {
    this.store.dispatch(new fromCore.CloseSidenav());
  }
}
