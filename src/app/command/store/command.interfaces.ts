import { Command } from "../models/command.model";

export interface CommandState {
  handled: HandledState;
}

export interface HandledState {
  [key: string]: Command;
}