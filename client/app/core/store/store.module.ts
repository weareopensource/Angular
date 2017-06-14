import { NgModule } from '@angular/core';
import {
  NgReduxModule,
  DevToolsExtension,
  NgRedux
} from '@angular-redux/store';
import {NgReduxRouterModule, NgReduxRouter} from '@angular-redux/router';
import {createEpicMiddleware, combineEpics} from 'redux-observable';
import {
  IAppState,
  rootReducer,
  middleware,
  enhancers
} from '.';

import { SessionActions } from '../actions';
import { SessionEpics } from "../epics";


@NgModule({
    imports: [NgReduxModule, NgReduxRouterModule],
    exports: [],
    declarations: [],
    providers: [SessionActions, SessionEpics],
})
export class StoreModule {

    EPICS = combineEpics(
    this.epics.login,
    this.epics.editProfile,
    this.epics.getProfile,
    this.epics.changePassword,
  );
  constructor(
    private devTools: DevToolsExtension,
    private ngRedux: NgRedux<IAppState>,
    private ngReduxRouter: NgReduxRouter,
    private epics: SessionEpics) {
    middleware.push(createEpicMiddleware(this.EPICS));

    ngRedux.configureStore(
      rootReducer,
      {},
      middleware,
      devTools.isEnabled() ?
        [...enhancers, devTools.enhancer()] :
        enhancers);
    ngReduxRouter.initialize();
  }
}
