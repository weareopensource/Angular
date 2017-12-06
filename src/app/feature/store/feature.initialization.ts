import { Injectable, Inject } from "@angular/core";
import * as CoreActions from "../store/feature.actions";
import { FeatureState } from "../store";
import { Store } from "@ngrx/store";

@Injectable()
export class FeatureInitialization {
  constructor(private store: Store<FeatureState>) { }
  
  public initGreetings(configuration) {
    this.store.dispatch(new CoreActions.InitGreetings(configuration));
  }
}