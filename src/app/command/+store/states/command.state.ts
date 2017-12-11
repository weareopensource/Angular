import { Command } from 'app/command';

export interface CommandState {
  handled: HandledState;
}

export interface HandledState {
  [key: string]: Command;
}