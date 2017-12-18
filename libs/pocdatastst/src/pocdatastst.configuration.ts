import { MenuItem } from '@labdat/data-models';

interface PocDataststConfiguration {
  core: MenuItem[];
}

export const pocdataststConfiguration: PocDataststConfiguration = {
  core: [{
    order: 2,
    link: '/pocdatastst',
    name: 'POC',
    icon: 'image:ic_flash_on_24px',
    roles:['user']
  }]
};
