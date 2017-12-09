import { Injectable, Inject } from "@angular/core";
import * as CommandActions from "./command.actions";
import { CommandState } from "./command.interfaces";
import { Store } from "@ngrx/store";
import { AuthenticationSelectorsService } from "app/authentication";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CommandInitializationService {
  constructor(private store: Store<CommandState>, private authenticationSelectorsService: AuthenticationSelectorsService) { }
  
  public loadCommands() {
    this.store.select(this.authenticationSelectorsService.getLoggedIn)
    .first()
    .subscribe(loggedIn => {
      if (loggedIn) {
        this.store.dispatch(new CommandActions.Load());        
      }
    });
  }
}