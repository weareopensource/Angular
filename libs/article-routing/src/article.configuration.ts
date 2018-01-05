import { MenuItem } from '@labdat/data-models';

export interface ArticleConfiguration {
  core: MenuItem[],
  self: any
}

export const articleConfiguration: ArticleConfiguration = {
  core: [{
    order: 4,
    link: '/article',
    name: 'Article',
    icon: 'action:ic_chrome_reader_mode_24px',
    roles: ['user', 'admin'],
  }],
  self: {
    roles: ['user', 'admin'],
  }
};
