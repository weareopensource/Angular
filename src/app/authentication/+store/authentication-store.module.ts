import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationEffectsService } from './effects/authentication.effects.service';
import { AuthenticationInitializationService } from './services/authentication.initialization.service';
import { AuthenticationApiService } from './services/authentication.api.service';
import { authenticationReducers } from './reducers/authentication.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginSnackComponent } from './components/login-snack/login-snack.component';

export function initialisationFactory(authenticationInitialisation) {
  return () => authenticationInitialisation.loadUser();
}

@NgModule({
  declarations: [ LoginSnackComponent ],
  imports: [
    HttpClientModule,
    StoreModule.forFeature('authentication', authenticationReducers),
    EffectsModule.forFeature([ AuthenticationEffectsService ])
  ],
  entryComponents: [LoginSnackComponent]
})
export class AuthenticationStoreModule {
  public static forRoot() {
    return {
      ngModule: AuthenticationStoreModule,
      providers: [
        AuthenticationInitializationService,
        AuthenticationApiService,
        { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [AuthenticationInitializationService], multi: true }
      ]
    }
  }
}
