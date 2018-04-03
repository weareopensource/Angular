import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserInitializationService } from './+state/user.initialization';
import { userReducer } from './+state/user.reducer';
import { UserEffects } from './+state/user.effects';
import { UserApiService } from './services/user.api.service';
import { UserSnackComponent } from './components/user-snack/user-snack.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export function userInitialisationFactory(userInitialization): any {
  return () => userInitialization.loadUsers();
}

@NgModule({
  declarations: [ UserSnackComponent ],
  exports: [ UserSnackComponent ],
  entryComponents: [ UserSnackComponent ],
  imports: [
    MatSnackBarModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
    UserInitializationService,
    UserApiService,
    { provide: APP_INITIALIZER, useFactory: userInitialisationFactory, deps: [UserInitializationService], multi: true }
  ]
})
export class RootUserStateModule {}

@NgModule({})
export class UserStateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootUserStateModule,
      providers: [
        UserInitializationService,
        UserApiService,
        {
          provide: APP_INITIALIZER,
          useFactory: userInitialisationFactory,
          deps: [UserInitializationService],
          multi: true
        }
      ]
    };
  }
}
