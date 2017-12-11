import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store'; 
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'environments/environment';

import { applicationReducer, metaReducers, CustomSerializer } from './reducers/application.reducer';
import { RouterEffects } from './effects/router.effects';

import { AuthenticationStoreModule } from 'app/authentication/+store/authentication-store.module';
import { coreConfiguration } from 'app/core';
import { CoreStoreModule } from 'app/core/+store/core-store.module';
import { CommandStoreModule } from 'app/command/+store/command-store.module';
import { commandConfiguration } from 'app/command';
import { ArticleStoreModule } from 'app/article/+store/article-store.module';
import { articleConfiguration } from 'app/article';

@NgModule({
  imports: [
    StoreModule.forRoot(applicationReducer, { metaReducers }),
    EffectsModule.forRoot([RouterEffects]),
    RouterModule.forRoot([]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthenticationStoreModule.forRoot(),
    CoreStoreModule.forRoot([
      ...coreConfiguration.self,
      ...commandConfiguration.core,
      ...articleConfiguration.core
    ]),
    CommandStoreModule.forRoot(),
    ArticleStoreModule.forRoot(articleConfiguration.self),
    // DBModule.provideDB(schema),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ]
})
export class ApplicationStoreModule { }
  


