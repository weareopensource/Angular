import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { CoreInitialization, CoreSelectors, coreReducers } from './store';
import { MenuItem } from './models';
import { StoreModule } from '@ngrx/store';

const CORE_CONFIGURATION = new InjectionToken('CORE_CONFIGURATION');

function initialisationFactory(coreConfiguration, configuration) {
  return () => coreConfiguration.addMenuItem(configuration) ;
}

@NgModule({
  imports: [ StoreModule.forFeature('core', coreReducers) ]
})
export class CoreStoreModule {
  public static configure(configuration: MenuItem[]) {
    return {
      ngModule: CoreStoreModule,
      providers: [
        CoreInitialization,
        CoreSelectors,
        { provide: CORE_CONFIGURATION, useValue: configuration },        
        { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [CoreInitialization, CORE_CONFIGURATION], multi: true }    
      ]
    };
  }

}
