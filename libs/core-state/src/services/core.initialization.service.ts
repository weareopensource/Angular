import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CoreActions from '../+state/actions/core-state.actions';
import { CoreState } from '../+state/states/core-state.state';

@Injectable()
export class CoreInitializationService {
  constructor(private store: Store<CoreState>) {}

  public addMenuItems(configuration) {
    this.store.dispatch(new CoreActions.AddMenuItems(configuration));
  }
}
