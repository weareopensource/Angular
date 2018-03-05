import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material';
import { SidenavModule } from '@labdat/sidenav';
import { AuthenticationModule } from '@labdat/authentication';
import { CoreModule } from '@labdat/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreStateModule } from '@labdat/core-state';
import { AuthenticationStateModule } from '@labdat/authentication-state';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers } from './+state/app.reducer';
import { coreConfiguration } from '@labdat/core';
import { environment } from '../environments/environment';
import { RouterStateModule } from '@labdat/router-state';
import { ConnectFormStateModule } from '@labdat/connect-form-state';
import { TaskStateModule } from '@labdat/task-state';
import { taskConfiguration } from '@labdat/task';
import { TaskRoutingModule } from '@labdat/task-routing';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  imports: [
    NxModule.forRoot(),
//    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    FormlyModule.forRoot(),
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    MatIconModule,

    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    RouterModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    SidenavModule.forRoot(),
    AuthenticationModule.forRoot(),
    CoreModule.forRoot(),
    TaskRoutingModule.forRoot(),

    RouterStateModule.forRoot(),
    AuthenticationStateModule.forRoot(),
    CoreStateModule.forRoot([
      ...coreConfiguration.self,
      ...taskConfiguration.core
    ]),
    ConnectFormStateModule,
    TaskStateModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
