import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material';
import { SidenavModule } from '@labdat/sidenav';
import { AuthenticationModule } from '@labdat/authentication';
import { coreConfiguration, CoreModule } from '@labdat/core';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './components/app.component';
import { CoreStateModule } from '@labdat/core-state';
import { AuthenticationStateModule } from '@labdat/authentication-state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers } from './+state/app.reducer';
import { environment } from '../environments/environment';
import { RouterStateModule } from '@labdat/router-state';
import { ConnectFormStateModule } from '@labdat/connect-form-state';
import { TaskStateModule } from '@labdat/task-state';
import { taskConfiguration } from '@labdat/task';
import { FormlyModule } from '@ngx-formly/core';
import { TaskRoutingModule } from '@labdat/task-routing';

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
    ConnectFormStateModule,

    RouterStateModule.forRoot(),
    AuthenticationStateModule.forRoot(),
    CoreStateModule.forRoot([coreConfiguration.self, taskConfiguration.core]),
    TaskStateModule.forRoot(),
    TaskRoutingModule.forRoot(),

    AuthenticationModule.forRoot(),
    CoreModule.forRoot()

  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
