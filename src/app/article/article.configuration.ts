import { MenuItem } from 'app/core';

export interface ArticleConfiguration {
  core: MenuItem[],
  self: any
}

export const articleConfiguration: ArticleConfiguration = {
  core: [{
    order: 3,
    link: '/article',
    name: 'Article',
    icon: 'action:ic_chrome_reader_mode_24px',
    roles: ['user', 'admin']
  }],
  self: {
    roles: ['user', 'admin'],
    greetings: 'Hello from article' 
  }
};