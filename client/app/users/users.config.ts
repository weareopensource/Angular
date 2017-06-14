import { Injectable } from '@angular/core';
import {MenuService} from '../core/services/menu.client.service';
@Injectable()
export class UsersConfig {
  constructor(private menuService: MenuService) {

  }
  addMenu() {
    this.menuService.addMenuItem('toolBar', {
      state: 'list-users',
      title: 'Users list',
      icon: 'fa-list',
      roles: ['admin'],
    });
  }
}
