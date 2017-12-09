import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommandInitializationService } from './store/command.initialization.service';
import { CommandSelectorsService } from './store/command.selectors.service';
import { commandReducer } from './store/command.reducer';
import { CommandEffectsService } from './store/command.effects.service';
import { CommandApiService } from './services/command.api.service';

function initialisationFactory(commandInitialization) {
  return () => commandInitialization.loadCommands() ;
}
@NgModule({
  imports: [
    StoreModule.forFeature('command', commandReducer),
    EffectsModule.forFeature([ CommandEffectsService ])
  ],
  providers: [
    CommandInitializationService,
    CommandSelectorsService,
    CommandApiService,
    { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [CommandInitializationService], multi: true }    
  ]
})
export class CommandStoreModule { }
