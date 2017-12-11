import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material';
import { ArticleRoutingModule } from 'app/article/+routing/article-routing.module';
import { ArticleComponent } from './components/article/article.component';
import { articleConfiguration } from './article.configuration';

const COMPONENTS = [
  ArticleComponent
];

const MATERIAL_MODULES = [
  MatCardModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ArticleModule { }

@NgModule({
  imports: [
    ArticleModule,
    ArticleRoutingModule//.withRoles(articleConfiguration.article.roles)
  ]
})
export class RootArticleModule { }
