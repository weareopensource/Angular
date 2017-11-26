import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { ArticleInitialization, ArticleSelectors, articleReducer } from './store';
import { StoreModule } from '@ngrx/store';

const ARTICLE_CONFIGURATION = new InjectionToken('ARTICLE_CONFIGURATION');

function initialisationFactory(coreInitialization, configuration) {
  return () => coreInitialization.initGreetings(configuration.greetings) ;
}

@NgModule({
  imports: [
    StoreModule.forFeature('article', articleReducer)
  ]
})
export class ArticleStoreModule {
  public static configure(configuration: string) {
    return {
      ngModule: ArticleStoreModule,
      providers: [
        ArticleInitialization,
        ArticleSelectors,
        { provide: ARTICLE_CONFIGURATION, useValue: configuration },        
        { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [ArticleInitialization, ARTICLE_CONFIGURATION], multi: true }    
      ]
    };
  }

}
