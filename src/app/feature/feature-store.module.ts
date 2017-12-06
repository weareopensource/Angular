import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { FeatureInitialization, FeatureSelectors, featureReducer } from './store';
import { StoreModule } from '@ngrx/store';

const CORE_CONFIGURATION = new InjectionToken('CORE_CONFIGURATION');

function initialisationFactory(coreInitialization, configuration) {
  return () => coreInitialization.initGreetings(configuration.greetings) ;
}

@NgModule({
  imports: [
    StoreModule.forFeature('core', featureReducer)
  ]
})
export class FeatureStoreModule {
  public static configure(configuration: string) {
    return {
      ngModule: FeatureStoreModule,
      providers: [
        FeatureInitialization,
        FeatureSelectors,
        { provide: CORE_CONFIGURATION, useValue: configuration },        
        { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [FeatureInitialization, CORE_CONFIGURATION], multi: true }    
      ]
    };
  }

}
