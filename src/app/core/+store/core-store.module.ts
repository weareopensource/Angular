import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { CoreInitializationService } from './services/core.initialization.service';
import { coreReducers } from './reducers/core.reducers';
import { MenuItem } from './states/menu-item.model';
import { StoreModule } from '@ngrx/store';

const CORE_CONFIGURATION = new InjectionToken('CORE_CONFIGURATION');

export function initialisationFactory(coreInitialization, configuration) {
  return () => coreInitialization.addMenuItems(configuration) ;
}

@NgModule({
  imports: [
    StoreModule.forFeature('core', coreReducers)
  ]
})
export class CoreStoreModule {
  public static forRoot(configuration: MenuItem[]) {
    return {
      ngModule: CoreStoreModule,
      providers: [
        CoreInitializationService,
        { provide: CORE_CONFIGURATION, useValue: configuration },        
        { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [CoreInitializationService, CORE_CONFIGURATION], multi: true }    
      ]
    };
  }
}
