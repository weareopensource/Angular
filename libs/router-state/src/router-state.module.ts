import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store'; 
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './+state/router-state.effects';
import { routerReducer } from '@ngrx/router-store';
import { CustomSerializer } from './services/custom-serializer.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule()
export class RouterStateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootRouterStateModule,
      providers: [
        { provide: RouterStateSerializer, useClass: CustomSerializer }
      ]
    }
  }
}

@NgModule({
  imports: [
    StoreModule.forFeature('router', routerReducer),
    EffectsModule.forFeature([RouterEffects]),
    StoreRouterConnectingModule,
  ]
})
class RootRouterStateModule {}


