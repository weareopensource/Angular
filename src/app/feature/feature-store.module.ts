import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { FeatureInitialization, FeatureSelectors, featureReducer } from './store';
import { StoreModule } from '@ngrx/store';

const FEATURE_CONFIGURATION = new InjectionToken('FEATURE_CONFIGURATION');

function initialisationFactory(coreInitialization, configuration) {
  return () => coreInitialization.initGreetings(configuration.greetings) ;
}

@NgModule({
  imports: [
    StoreModule.forFeature('feature', featureReducer)
  ]
})
export class FeatureStoreModule {
  public static configure(configuration: string) {
    return {
      ngModule: FeatureStoreModule,
      providers: [
        FeatureInitialization,
        FeatureSelectors,
        { provide: FEATURE_CONFIGURATION, useValue: configuration },        
        { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [FeatureInitialization, FEATURE_CONFIGURATION], multi: true }    
      ]
    };
  }

}
