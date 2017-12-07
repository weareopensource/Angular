import { Injectable, Inject } from "@angular/core";
import * as CommandActions from "./command.actions";
import { CommandState } from "./command.interfaces";
import { Store } from "@ngrx/store";
import { AuthenticationSelectors } from "app/authentication/store";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CommandInitialization {
  constructor(private store: Store<CommandState>, private authenticationSelectors: AuthenticationSelectors) { }
  
  public loadCommands() {
    this.store.select(this.authenticationSelectors.getLoggedIn)
    .first()
    .subscribe(loggedIn => {
      if (loggedIn) {
        this.store.dispatch(new CommandActions.Load());        
      }
    });
  }
}