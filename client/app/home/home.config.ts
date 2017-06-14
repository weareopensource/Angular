import { Injectable } from '@angular/core';
import {MenuService} from '../core/services/menu.client.service';

@Injectable()
export class HomeConfig {
  constructor(private menuService : MenuService){

  }
  addMenu(){
    this.menuService.addMenuItem('sideNav',{
      state: 'home',
      title: 'Home',
      icon: 'fa-home',
      roles: ['*']
    })
  }
}
