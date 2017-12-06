import { Action } from '@ngrx/store';

export const INIT_GREETINGS = '[Feature] Init Greeting';

export class InitGreetings implements Action {
  readonly type = INIT_GREETINGS;
  constructor(public payload: string) {}  
}

export type Actions = InitGreetings;