import {
  Component,
  ViewChild,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { values, difference, isEmpty } from 'lodash';
import { fromCore, getShowSidenav, getMenuItems } from '@labdat/core-state';
import { getLoggedIn, getUser } from '@labdat/authentication-state';
import { map } from 'rxjs/operators/map';
import { routesAnimation } from '@labdat/animations';

@Component({
  selector: 'layout-root',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [ routesAnimation ]
})
export class LayoutComponent implements OnInit {

  @ViewChild('outlet')
  public outlet;

  public menuItems$;
  public isSidenavOpened$ = this.store.select(getShowSidenav);
  public isLoggedIn$ = this.store.select(getLoggedIn);

  constructor(private store: Store<any>) {}

  ngOnInit() {
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

  public openSidenav() {
    this.store.dispatch(new fromCore.OpenSidenav());
  }

  public closeSidenav() {
    this.store.dispatch(new fromCore.CloseSidenav());
  }
}
