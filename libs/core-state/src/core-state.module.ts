import { APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CoreInitializationService } from './services/core.initialization.service';
import { coreReducers } from './+state/reducers/core-state.reducers';
import { StoreModule } from '@ngrx/store';
import { merge } from 'lodash';

const CORE_CONFIGURATION = new InjectionToken('CORE_CONFIGURATION');

const initialisationFactory = (coreInitialization, configuration) => {
  return () => {
    const mergedConfiguration = merge(...configuration);
    coreInitialization.setLogo(mergedConfiguration.logo);
    coreInitialization.setTitle(mergedConfiguration.title);
    coreInitialization.addMenuItems(mergedConfiguration.sidenav);
  };
};

@NgModule({
  imports: [StoreModule.forFeature('core', coreReducers)]
})
export class CoreStateModule {
  public static forRoot(configuration: any): ModuleWithProviders {
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
