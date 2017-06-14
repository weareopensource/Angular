import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ARTICLES COMPONENTS
import { ArticlesComponent, ArticlesListComponent, ArticleDetailsComponent } from '.';

import { Auth } from 'app/users';

const articlesRoutes: Routes = [{
        path: '',
        component: ArticlesComponent,
        canActivate: [Auth],
        data : {
          roles : ['user', 'admin'],
          title : 'Articles'
        },
        children: [{
            path: '',
            component: ArticlesListComponent,
            data : { title : 'Articles List'}
          },
          {
          path: 'article/:id',
          component: ArticleDetailsComponent,
          data : { title : 'Article Detail'}
        }]
      }
    ];
@NgModule({
  imports: [
    RouterModule.forChild(articlesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArticlesRoutingModule { }
