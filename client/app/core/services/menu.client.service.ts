import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
  menus = {};
  menuToolBar = {};
  defaultRoles = ['user', 'admin'];
  constructor() {
    this.addMenu('sideNav', {
      roles: ['*']
    }, this.menus);
    this.addMenu('toolBar', {
      roles: ['*']
    }, this.menuToolBar);
  }
  private shouldRender(userRoles, itemMenuRoles) {
    if (itemMenuRoles.indexOf('*') !== -1) {
      return true;
    } else {
      if (!userRoles) {
        return false;
      }

      for (var userRoleIndex in userRoles) {
        if (userRoles.hasOwnProperty(userRoleIndex)) {
          for (var roleIndex in itemMenuRoles) {
            if (itemMenuRoles.hasOwnProperty(roleIndex) && itemMenuRoles[roleIndex] === userRoles[userRoleIndex]) {
              return true;
            }
          }
        }
      }
    }

    return false;
  };
  shouldRenderMenu(menu, userRole) {
    for (const item in menu) {
      if (menu[item].shouldRender(userRole, menu[item].roles)) {
        return true;
      }
    }
    return false;
  };
  addMenu(menuId, options, menus) {
    options = options || {};
    // Create the new menu
    menus[menuId] = {
      roles: options.roles || this.defaultRoles,
      items: options.items || [],
    };
    // Return the menu object
    return menus[menuId];
  };
  addMenuItem(menuId, options) {
    options = options || {};
    this.validateMenuExistence(menuId);
    if (this.validateMenuItemExistence(options.state, menuId, this.menus)) {
      if (this.menus[menuId]) {
        this.menus[menuId].items.push({
          title: options.title || '',
          state: options.state || '',
          icon: options.icon || '',
          type: options.type || 'item',
          class: options.class,
          roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.defaultRoles : options.roles),
          position: options.position || 0,
          items: [],
          shouldRender: this.shouldRender
        });
        return this.menus[menuId];
      }
    } else if (this.validateMenuItemExistence(options.state, menuId, this.menuToolBar)) {
      if (this.menuToolBar[menuId]) {
        this.menuToolBar[menuId].items.push({
          title: options.title || '',
          state: options.state || '',
          icon: options.icon || '',
          type: options.type || 'item',
          class: options.class,
          roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.defaultRoles : options.roles),
          position: options.position || 0,
          items: [],
          shouldRender: this.shouldRender
        });
      }
      return this.menuToolBar[menuId];
    }
  };
  addSubMenuItem() { };
  getMenu(menuId) {
    this.validateMenuExistence(menuId);
    // Return the menu object
    return this.menus[menuId] ? this.menus[menuId] : this.menuToolBar[menuId];
  };
  removeMenu() { }
  removeMenuItem() { };
  removeSubMenuItem() { }
  validateMenuExistence(menuId) {
    if (menuId && menuId.length) {
      if (this.menus[menuId] || this.menuToolBar[menuId]) {
        return true;
      } else {
        throw new Error('Menu does not exist');
      }
    } else {
      throw new Error('MenuId was not provided');
    }
  }
  validateMenuItemExistence(state, menuId, menus) {
    if (menus[menuId]) {
      for (var item in menus[menuId].items) {
        if (menus[menuId].items[item].state === state)
          return false;
      }
      return true;
    }
    return false
  }
}
