import * as CommandActions from './command.actions';
import { Command } from '../models/command.model';
import { CommandState, HandledState } from './command.interfaces';
import { keyBy } from 'lodash';
import { AuthenticationActions } from 'app/authentication';

export function handledReducer(state: HandledState = {}, action: CommandActions.Actions | AuthenticationActions.Actions): HandledState {
  switch (action.type) {
    case CommandActions.LOAD_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case AuthenticationActions.LOGOUT: {
      return {}; 
    }/*
    case command.HANDLE_SUCCESS: {
      return {
        handled: {
          ...state.handled,
          ...keyBy(action.payload.commands, 'id'),          
        }
      };
    }*/
    default: {
      return state;
    }
  }
}

export const commandReducer = {
  handled: handledReducer,
};