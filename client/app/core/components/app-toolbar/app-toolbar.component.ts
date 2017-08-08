import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {TooltipPosition} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { MenuService } from '../../services';
import { SessionActions } from '../../actions';
import { IUserRecord } from '../../store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit {
  title: string;
  toolBarList: Array<Object> = [];
  canDisplayMenu: any;
  @Input() titleToolbar: string;
  @select(['session', 'token']) loggedIn$: Observable<string>;
  @select(['session', 'toggleSideNav']) isToggled$: Observable<string>;
  @select(['session', 'user']) user$: Observable<IUserRecord>;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private actions: SessionActions,
              private menuService: MenuService ) {
    this.toolBarList = menuService.getMenu('toolBar').items;
    this.canDisplayMenu = menuService.shouldRenderMenu;
  }


  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => this.title = event['title'] );

  }

  logout() {
   this.actions.logoutUser();
   this.router.navigate(['/']);
  }

}
