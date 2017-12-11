import * as fromCommand from '../actions/command.actions';
import { Command } from 'app/command';
import { CommandState, HandledState } from '../states/command.state';
import { keyBy } from 'lodash';
import { fromAuthentication } from 'app/authentication/+store';

export function handledReducer(state: HandledState = {}, action: fromCommand.Actions | fromAuthentication.Actions): HandledState {
  switch (action.type) {
    case fromCommand.LOAD_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case fromAuthentication.LOGOUT: {
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