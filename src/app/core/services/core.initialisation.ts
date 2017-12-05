import { Injectable, Inject } from "@angular/core";
import * as CoreActions from "../store/core.actions";
import { CoreState } from "../store";
import { Store } from "@ngrx/store";

@Injectable()
export class CoreInitialisation {
  constructor(private store: Store<CoreState>) { }
  
  public addMenuItem(configuration) {
    configuration.forEach(configuration => this.store.dispatch(new CoreActions.AddMenuItem(configuration)));
  }
}