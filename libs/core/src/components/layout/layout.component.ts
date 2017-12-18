import { Component, HostListener, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { startWith } from 'rxjs/operators/startWith';
import { values, difference, isEmpty } from 'lodash';
import { fromCore, CoreState, getShowSidenav, getMenuItems } from '@labdat/core-state';
import { getLoggedIn, getUser } from '@labdat/authentication-state';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'layout-root',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public menuItems$;
  public isSidenavOpened$ = this.store.select(getShowSidenav);
  public isLoggedIn$ = this.store.select(getLoggedIn);

  constructor(private store: Store<CoreState>, private router: Router) {}

  ngOnInit() {
    const items$ = this.store.select(getMenuItems);
    const user$ = this.store.select(getUser);
    this.menuItems$ = items$.pipe(
      combineLatest(user$),
      map(([items, user]) =>
        values(items)
          .filter(item => isEmpty(item.roles) || (user && !isEmpty(difference(item.roles, user.roles))))
          .filter(items => !isEmpty(items))
      )
    );
  }

  public openSidenav() {
    this.store.dispatch(new fromCore.OpenSidenav());
  }

  public closeSidenav() {
    this.store.dispatch(new fromCore.CloseSidenav());
  }
}
