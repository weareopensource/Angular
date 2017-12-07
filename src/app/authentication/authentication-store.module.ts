import { NgModule, APP_INITIALIZER } from '@angular/core';
import {
  AuthenticationSelectors,
  AuthenticationEffects,
  AuthenticationActions,
  AuthenticationInitialization,
  authenticationReducers
 } from './store';
import {  } from './store/authentication.initialisation';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginSnackComponent } from './components';

function initialisationFactory(authenticationInitialisation) {
  return () => authenticationInitialisation.loadUser();
}

@NgModule({
  imports: [
    StoreModule.forFeature('authentication', authenticationReducers),
    EffectsModule.forFeature([ AuthenticationEffects ])
  ],
  entryComponents: [LoginSnackComponent],  
  providers: [
    AuthenticationSelectors,
    AuthenticationActions,
    AuthenticationInitialization,
    { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [AuthenticationInitialization], multi: true }        
    
  ]
})
export class AuthenticationStoreModule {}
