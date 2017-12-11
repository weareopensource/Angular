import { MenuItem } from 'app/core';

export interface CommandConfiguration {
  core: MenuItem[],
  self: any
}

export const commandConfiguration: CommandConfiguration = {
  core: [{
    order: 4,
    link: '/command',
    name: 'Command',
    icon: 'action:ic_chrome_reader_mode_24px',
    roles: ['user', 'admin'],
  }],
  self: {
    roles: ['user', 'admin'],
  }
};