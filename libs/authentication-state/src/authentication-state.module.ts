import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationEffectsService } from './+state/effects/authentication-state.effects.service';
import { AuthenticationInitializationService } from './services/authentication.initialization.service';
import { AuthenticationApiService } from './services/authentication.api.service';
import { authenticationReducers } from './+state/reducers/authentication-state.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginSnackComponent } from './components/login-snack/login-snack.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptorService } from './services/authentication.interceptor.service';

export function initialisationFactory(authenticationInitialisation): any {
  return () => authenticationInitialisation.loadUser();
}

@NgModule({
  declarations: [LoginSnackComponent],
  imports: [
    HttpClientModule,
    StoreModule.forFeature('authentication', authenticationReducers),
    EffectsModule.forFeature([AuthenticationEffectsService])
  ],
  entryComponents: [LoginSnackComponent]
})
export class RootAuthenticationStateModule {}

@NgModule({})
export class AuthenticationStateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthenticationStateModule,
      providers: [
        AuthenticationInitializationService,
        AuthenticationApiService,
        {
          provide: APP_INITIALIZER,
          useFactory: initialisationFactory,
          deps: [AuthenticationInitializationService],
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationInterceptorService,
          multi: true
        }
      ]
    };
  }
}
