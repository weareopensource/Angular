import { MenuItem } from '@labdat/data-models';

export interface UserConfiguration {
  core: Array<MenuItem>;
  self: any;
}

export const userConfiguration: UserConfiguration = {
  core: [
    {
      order: 4,
      link: '/user',
      name: 'User',
      icon: 'action:ic_chrome_reader_mode_24px',
      roles: ['user', 'admin']
    }
  ],
  self: {
    roles: ['user', 'admin']
  }
};
