import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AuthenticationSelectorsService } from './store/authentication.selectors.service';
import { AuthenticationEffectsService } from './store/authentication.effects.service';
import { AuthenticationInitializationService } from './store/authentication.initialization.service';
import { authenticationReducers } from './store/authentication.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginSnackComponent } from './components/login-snack/login-snack.component';

function initialisationFactory(authenticationInitialisation) {
  return () => authenticationInitialisation.loadUser();
}

@NgModule({
  imports: [
    StoreModule.forFeature('authentication', authenticationReducers),
    EffectsModule.forFeature([ AuthenticationEffectsService ])
  ],
  entryComponents: [LoginSnackComponent],  
  providers: [
    AuthenticationSelectorsService,
    AuthenticationInitialization,
    { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [AuthenticationInitializationService], multi: true }        
    
  ]
})
export class AuthenticationStoreModule {}
