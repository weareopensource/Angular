import { MenuItem } from 'app/core/models';

export interface FeatureConfiguration {
  core: MenuItem
}

export const featureConfiguration: FeatureConfiguration = {
  core: {
    link: '/feature',
    name: 'Feature',
    icon: 'content:ic_add_24px',
    roles: ['user', 'admin'],
  }
};