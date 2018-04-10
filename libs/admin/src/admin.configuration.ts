import { MenuItem } from '@labdat/core';

export interface UserConfiguration {
  core: { sidenav: Array<MenuItem> };
  self: { roles: Array<string>; };
}

export const adminConfiguration: UserConfiguration = {
  core: {
    sidenav: [{
      order: 2,
      link: '/admin',
      name: 'User',
      icon: 'action:ic_chrome_reader_mode_24px',
      roles: ['admin']
    }]
  },
  self: {
    roles: ['admin']
  }
};
