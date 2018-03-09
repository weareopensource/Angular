import { MenuItem } from '@labdat/data-models';

interface CoreConfiguration {
  self: Array<MenuItem>;
}

export const coreConfiguration: CoreConfiguration = {
  self: [
    {
      order: 1,
      link: '/home',
      name: 'Home',
      icon: 'action:ic_home_24px'
    }
  ]
};
