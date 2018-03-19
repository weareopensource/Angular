import { MenuItem } from '@labdat/data-models';

export interface TaskConfiguration {
  core: Array<MenuItem>;
  self: any;
}

export const taskConfiguration: TaskConfiguration = {
  core: [
    {
      order: 4,
      link: '/task',
      name: 'Task',
      icon: 'action:ic_chrome_reader_mode_24px',
      roles: ['user', 'admin']
    }
  ],
  self: {
    roles: ['user', 'admin']
  }
};
