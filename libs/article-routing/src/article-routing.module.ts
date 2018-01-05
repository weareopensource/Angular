import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleDetailComponent, ArticlesListComponent } from '@labdat/article/components';
import { AuthenticationGuardService } from '@labdat/authentication';
import { articleConfiguration } from './article.configuration';
import { isEmpty } from 'lodash';

const articlesRoutes: Routes = [{
  path: '',
  component: ArticlesListComponent,
  children: [{
    path: ':id',
    component: ArticleDetailComponent,
    data: { state: 'detail' }
  }],
}];

if (!isEmpty(articleConfiguration.self.roles)) {
  Object.assign(articlesRoutes[0], {
    data: {
      expectedRoles: articleConfiguration.self.roles
    }
  });
}

@NgModule({
  imports: [
    RouterModule.forChild(articlesRoutes)
  ]
})
export class ArticleRoutingModule { }
