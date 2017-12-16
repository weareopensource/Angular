import { MenuItem } from '@labdat/data-models';

interface SlidesConfiguration {
  core: MenuItem[]
}

export const slidesConfiguration: SlidesConfiguration = {
  core: [{
    order: 4,
    link: '/slides',
    name: 'Slides',
    icon: 'hardware:ic_desktop_mac_24px'
  }]
};