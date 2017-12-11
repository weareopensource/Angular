import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleGuardService } from './services/article.guard.service';
import { ArticleComponent, articleConfiguration } from 'app/article';
import { isEmpty } from 'lodash';

const articleRoutes: Routes = [{
  path: '',
  component: ArticleComponent,
  canActivate: [ ArticleGuardService ]
}];

if (!isEmpty(articleConfiguration.self.roles)) {
  Object.assign(articleRoutes[0], {
    data: {
      expectedRoles: articleConfiguration.self.roles
    },
    canActivate: [ ArticleGuardService ]
  });
}

@NgModule({
  imports: [
    RouterModule.forChild(articleRoutes)
  ],
  providers: [ ArticleGuardService ]
})
export class ArticleRoutingModule {}
