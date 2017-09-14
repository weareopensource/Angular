import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

import { MenuService } from '../../services';
import { IUser } from "../../store/session";


@Component({
  selector: 'app-sidenav',
  templateUrl: './app-sidenav.component.html',
  styleUrls: ['./app-sidenav.component.scss'],
})
export class AppSidenavComponent {

  @ViewChild('sidenav') sidenav: ElementRef;

  sideToogle: boolean = false;
  // Menu Item
  menuList: Array<Object> = [];

  @select(['session', 'token']) loggedIn$: Observable<string>;
  @select(['session', 'user']) user$: Observable<IUser>;

  constructor(private menuService : MenuService) {
    this.menuList =menuService.getMenu('sideNav').items;
  }

  ngAfterViewInit() {
    if (localStorage.sideToogle) {
      this.sideToogle = (localStorage.sideToogle === 'true');
    } else {
      localStorage.setItem('sideToogle', this.sideToogle.toString());
    }
  }

  toggleNav() {
    this.sideToogle = !this.sideToogle;
    localStorage.setItem('sideToogle', this.sideToogle.toString());
  }

}
