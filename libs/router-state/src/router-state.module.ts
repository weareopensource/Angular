import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { routerReducer, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './+state/router-state.effects';
import { CustomSerializer } from './services/custom-serializer.service';

@NgModule()
export class RouterStateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootRouterStateModule,
      providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }]
    };
  }
}

@NgModule({
  imports: [
    StoreModule.forFeature('router', routerReducer),
    EffectsModule.forFeature([RouterEffects]),
    StoreRouterConnectingModule
  ]
})
export class RootRouterStateModule {}
