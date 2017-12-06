import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleGuard } from './services';
import { ArticleComponent } from './components/article';
import { articleConfiguration } from './configuration';
import { isEmpty } from 'lodash';

const articleRoutes: Routes = [{
  path: '',
  component: ArticleComponent,
  canActivate: [ ArticleGuard ]
}];

if (!isEmpty(articleConfiguration.self.roles)) {
  Object.assign(articleRoutes[0], {
    data: {
      expectedRoles: articleConfiguration.self.roles
    },
    canActivate: [ ArticleGuard ]
  });
}

@NgModule({
  imports: [
    RouterModule.forChild(articleRoutes)
  ],
  providers: [ ArticleGuard ]
})
export class ArticleRoutingModule {}
