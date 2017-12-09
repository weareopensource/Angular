import { MenuItem } from 'app/core';

interface CoreConfiguration {
  self: MenuItem[]
}

export const coreConfiguration: CoreConfiguration = {
  self: [{
    order: 1,
    link: '/home',
    name: 'Home',
    icon: 'action:ic_home_24px',
    roles:['user', 'admin']
  }, {
    order: 2,
    link: '/test',
    name: 'Test',
    icon: 'action:ic_pan_tool_24px',
    roles:['user', 'admin']
  }]
};