import { Injectable } from '@angular/core';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CommandState } from '../states/command.state';
import { values } from 'lodash';
import { Command } from 'app/command';


const selectCommandState = createFeatureSelector<CommandState>('command');
export const getHandledCommands = createSelector(selectCommandState, (state: CommandState) => values(state.handled));
