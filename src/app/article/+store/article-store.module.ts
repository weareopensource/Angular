import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ArticleInitializationService } from './services/article.initialization.service';
import { articleReducer } from './reducers/article.reducer';

const ARTICLE_CONFIGURATION = new InjectionToken('ARTICLE_CONFIGURATION');

function initialisationFactory(articleInitializationService, configuration) {
  return () => articleInitializationService.initGreetings(configuration.greetings) ;
}

@NgModule({
  imports: [
    StoreModule.forFeature('article', articleReducer)
  ]
})
export class ArticleStoreModule {
  public static forRoot(configuration: string) {
    return {
      ngModule: ArticleStoreModule,
      providers: [
        ArticleInitializationService, {
          provide: ARTICLE_CONFIGURATION, useValue: configuration
        }, {
          provide: APP_INITIALIZER,
          useFactory: initialisationFactory,
          deps: [ ArticleInitializationService, ARTICLE_CONFIGURATION ],
          multi: true
        }
      ]
    };
  }
}
