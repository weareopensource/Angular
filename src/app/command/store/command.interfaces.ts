import { Command } from "../models";

export interface CommandState {
  handled: HandledState;
}

export interface HandledState {
  [key: string]: Command;
}