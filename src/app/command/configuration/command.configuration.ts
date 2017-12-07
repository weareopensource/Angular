import { MenuItem } from 'app/core/models';

export interface CommandConfiguration {
  core: MenuItem[],
  self: any
}

export const commandConfiguration: CommandConfiguration = {
  core: [{
    order: 3,
    link: '/command',
    name: 'Command',
    icon: 'action:ic_chrome_reader_mode_24px',
    roles: ['user', 'admin'],
  }],
  self: {
    roles: ['user', 'admin'],
  }
};