import { Injectable, Inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as CoreActions from "../actions/core.actions";
import { CoreState } from "../states/core.state";

@Injectable()
export class CoreInitializationService {
  constructor(private store: Store<CoreState>) { }
  
  public addMenuItems(configuration) {
    this.store.dispatch(new CoreActions.AddMenuItems(configuration));
  }
}