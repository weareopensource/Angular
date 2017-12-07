import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommandInitialization, CommandSelectors, commandReducer, CommandEffects } from './store';
import { CommandApi } from './services';

function initialisationFactory(commandInitialization) {
  return () => commandInitialization.loadCommands() ;
}
@NgModule({
  imports: [
    StoreModule.forFeature('command', commandReducer),
    EffectsModule.forFeature([ CommandEffects ])
  ],
  providers: [
    CommandInitialization,
    CommandSelectors,
    CommandApi,
    { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [CommandInitialization], multi: true }    
  ]
})
export class CommandStoreModule { }
