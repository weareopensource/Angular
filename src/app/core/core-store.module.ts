import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { CoreInitializationService } from './store/core.initialization.service';
import { CoreSelectorsService } from './store/core.selectors.service';
import { coreReducers } from './store/core.reducers';
import { MenuItem } from './models/menu.item';
import { StoreModule } from '@ngrx/store';

const CORE_CONFIGURATION = new InjectionToken('CORE_CONFIGURATION');

function initialisationFactory(coreInitialization, configuration) {
  return () => coreInitialization.addMenuItems(configuration) ;
}

@NgModule({
  imports: [
    StoreModule.forFeature('core', coreReducers)
  ]
})
export class CoreStoreModule {
  public static configure(configuration: MenuItem[]) {
    return {
      ngModule: CoreStoreModule,
      providers: [
        CoreInitializationService,
        CoreSelectorsService,
        { provide: CORE_CONFIGURATION, useValue: configuration },        
        { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [CoreInitializationService, CORE_CONFIGURATION], multi: true }    
      ]
    };
  }

}
