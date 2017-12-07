import { Injectable } from '@angular/core';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CommandState } from './command.interfaces';
import { values } from 'lodash';

@Injectable()
export class CommandSelectors {

  public getHandledCommands;

  constructor() {
    const selectCommandState = createFeatureSelector<CommandState>('command');
    this.getHandledCommands = createSelector(selectCommandState, (state: CommandState) => values(state.handled));
  }
}
