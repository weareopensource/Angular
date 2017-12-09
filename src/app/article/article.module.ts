import { ArticleComponent } from './components/article/article.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleRoutingModule } from './article-routing.module';
import { articleConfiguration } from './configuration/article.configuration';
import { MatCardModule } from '@angular/material';

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
  ],
  providers: []
})
export class RootArticleModule { }
