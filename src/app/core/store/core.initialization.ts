import { Injectable, Inject } from "@angular/core";
import * as CoreActions from "../store/core.actions";
import { CoreState } from "../store";
import { Store } from "@ngrx/store";

@Injectable()
export class CoreInitialization {
  constructor(private store: Store<CoreState>) { }
  
  public addMenuItems(configuration) {
    this.store.dispatch(new CoreActions.AddMenuItems(configuration));
  }
}