import { MenuItem } from '@labdat/data-models';

export interface TaskConfiguration {
  core: MenuItem[],
  self: any
}

export const taskConfiguration: TaskConfiguration = {
  core: [{
    order: 4,
    link: '/tasks',
    name: 'Tasks',
    icon: 'action:ic_chrome_reader_mode_24px',
    roles: ['user', 'admin'],
  }],
  self: {
    roles: ['user', 'admin'],
  }
};
