import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommandInitializationService } from './services/command.initialization.service';
import { commandReducer } from './reducers/command.reducer';
import { CommandEffectsService } from './effects/command.effects.service';
import { CommandApiService } from './services/command.api.service';

export function initialisationFactory(commandInitialization) {
  return () => commandInitialization.loadCommands() ;
}

@NgModule({
  imports: [
    StoreModule.forFeature('command', commandReducer),
    EffectsModule.forFeature([ CommandEffectsService ])
  ],
})
export class CommandStoreModule {
  public static forRoot() {
    return {
      ngModule: CommandStoreModule,
      providers: [
        CommandInitializationService,
        CommandApiService,
        { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [CommandInitializationService], multi: true }    
      ]
    }
  }
}
