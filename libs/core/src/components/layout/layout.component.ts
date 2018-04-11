import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { intersection, isEmpty, values } from 'lodash';
import * as fromCore from '../../+state/actions/core-state.actions';
import { getLogo, getMenuItems, getShowSidenav, getTitle } from '../../+state/selectors/core-state.selectors';
import { fromAuthentication, getLoggedIn, getUser, User } from '@labdat/authentication';
import { map } from 'rxjs/operators/map';
import { routesAnimation } from '../../animations/routes.animation';
import { fromRouter } from '@labdat/common/router-state';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'core-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routesAnimation]
})
export class LayoutComponent implements OnInit {

  @ViewChild('outlet')
  public outlet;

  public logo$ = this.store.select(getLogo);
  public title$ = this.store.select(getTitle);
  public menuItems$;
  public isSidenavOpened$ = this.store.select(getShowSidenav);
  public isLoggedIn$ = this.store.select(getLoggedIn);
  public currentUser$ = this.store.select(getUser);
  public isAdmin$ = this.currentUser$.pipe(
    map((user: User) => (user) ? user.roles.includes('admin') : false)
  );

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    const items$ = this.store.select(getMenuItems);
    const user$ = this.store.select(getUser);
    this.menuItems$ = items$.pipe(
      combineLatest(
        user$,
        (items, user) =>
          values(items)
          .filter(item => isEmpty(item.roles) || (user && intersection(item.roles, user.roles).length > 0))
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

  public editProfile(): void {
    this.store.dispatch(new fromRouter.Go({ path: ['auth', 'profile'] }));
  }

  public userManagement(): void {
    this.store.dispatch(new fromRouter.Go({ path: ['admin', 'users'] }));
  }

  public goToAuthenticationPage(): void {
    this.store.dispatch(new fromRouter.Go({ path: ['auth'] }));
  }

  public goTo(link: string): void {
    this.store.dispatch(new fromRouter.Go({ path: [ link ] }));
  }

  public logout(): void {
    this.store.dispatch(new fromAuthentication.Logout());
  }

  public trackByOrder(item: MenuItem): number {
    return item.order;
  }
}
