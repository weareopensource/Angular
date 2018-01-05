import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ArticleInitializationService } from './+state/article.initialization';
import { articleReducer } from './+state/article.reducer';
import { ArticleEffects } from './+state/article.effects';
import { ArticleApiService } from './services/article.api.service';

export function articleInitialisationFactory(articleInitialization) {
  return () => articleInitialization.loadArticles() ;
}

@NgModule({})
export class ArticleStateModule {
  public static forRoot() {
    return {
      ngModule: RootArticleStateModule,
      providers: [
        ArticleInitializationService,
        ArticleApiService,
        {
          provide: APP_INITIALIZER,
          useFactory: articleInitialisationFactory,
          deps: [ArticleInitializationService],
          multi: true
        }
      ]
    };
  }
}

@NgModule({
  imports: [
    StoreModule.forFeature('article', articleReducer),
    EffectsModule.forFeature([ ArticleEffects ])
  ],
  providers: [
    ArticleInitializationService,
    ArticleApiService,
    { provide: APP_INITIALIZER, useFactory: articleInitialisationFactory, deps: [ArticleInitializationService], multi: true }
  ]
})
export class RootArticleStateModule { }
