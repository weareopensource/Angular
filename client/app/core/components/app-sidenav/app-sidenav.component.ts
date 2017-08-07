import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

import { ToggleNavService, MenuService } from '../../services';
import { IUser } from '../../store/session';
import { SessionActions } from '../../actions';


@Component({
  selector: 'app-sidenav',
  templateUrl: './app-sidenav.component.html',
  styleUrls: ['./app-sidenav.component.scss'],
})
export class AppSidenavComponent {

  @ViewChild('sidenav') sidenav: ElementRef;

  isNormalScreen = true;
  sideNavLock = false;
  isToggled: Observable<boolean>;
  // Menu Item
  menuList: Array<Object> = [];

  @select(['session', 'token']) loggedIn$: Observable<string>;
  @select(['session', 'toggleSideNav']) isToggled$: Observable<string>;
  @select(['session', 'user']) user$: Observable<IUser>;

  constructor(private toggleNavService: ToggleNavService, private actions: SessionActions, private menuService: MenuService) {
    this.menuList = menuService.getMenu('sideNav').items;
  }

  /* SideNav toggle action*/
  toggleNav() {
    this.actions.toggleSideNav();
  }
}
