import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store'; 
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './+state/router-state.effects';
import { routerReducer } from '@ngrx/router-store';
import { CustomSerializer } from './services/custom-serializer.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  imports: [
    StoreModule.forFeature('router', routerReducer),
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule,
  ]
})
export class RouterStateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RouterStateModule,
      providers: [
        { provide: RouterStateSerializer, useClass: CustomSerializer }
      ]
    }
  }
}
  


