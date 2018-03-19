import { APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CoreInitializationService } from './services/core.initialization.service';
import { coreReducers } from './+state/reducers/core-state.reducers';
import { MenuItem } from '@labdat/data-models';
import { StoreModule } from '@ngrx/store';

const CORE_CONFIGURATION = new InjectionToken('CORE_CONFIGURATION');

const initialisationFactory = (coreInitialization, configuration) => {
  return () => coreInitialization.addMenuItems(configuration);
};

@NgModule({
  imports: [StoreModule.forFeature('core', coreReducers)]
})
export class CoreStateModule {
  public static forRoot(configuration: Array<MenuItem>): ModuleWithProviders {
    return {
      ngModule: CoreStateModule,
      providers: [
        CoreInitializationService,
        { provide: CORE_CONFIGURATION, useValue: configuration },
        {
          provide: APP_INITIALIZER,
          useFactory: initialisationFactory,
          deps: [CoreInitializationService, CORE_CONFIGURATION],
          multi: true
        }
      ]
    };
  }
}
