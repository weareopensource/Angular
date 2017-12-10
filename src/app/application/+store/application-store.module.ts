import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'environments/environment';

import { applicationReducer, metaReducers } from './reducers/application.reducer';
import { RouterEffects } from './effects/router.effects';

import { AuthenticationStoreModule } from 'app/authentication/+store';
import { coreConfiguration } from 'app/core';
import { CoreStoreModule } from 'app/core/+store';
import { articleConfiguration } from 'app/article';
import { ArticleStoreModule } from 'app/article/+store';

@NgModule({
  imports: [
    StoreModule.forRoot(applicationReducer, { metaReducers }),
    EffectsModule.forRoot([RouterEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthenticationStoreModule,
    CoreStoreModule.forRoot([
      articleConfiguration.core,
    ...coreConfiguration.self
    ]),
    ArticleStoreModule.forRoot(articleConfiguration.self)
    // DBModule.provideDB(schema),
  ]
})
export class ApplicationStoreModule { }
  


