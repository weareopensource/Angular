import { Injectable, Inject } from "@angular/core";
import * as fromCommand from "../actions/command.actions";
import { CommandState } from "../states/command.state";
import { Store } from "@ngrx/store";
import { getLoggedIn } from "app/authentication/+store";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CommandInitializationService {
  constructor(private store: Store<CommandState>) { }
  
  public loadCommands() {
    this.store.select(getLoggedIn)
    .first()
    .subscribe(loggedIn => {
      if (loggedIn) {
        this.store.dispatch(new fromCommand.Load());        
      }
    });
  }
}