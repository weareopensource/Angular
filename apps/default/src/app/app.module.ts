import { AppComponent } from './components/app.component';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { coreConfiguration, CoreStateModule, CoreViewModule } from '@labdat/core';
import { StoreModule } from '@ngrx/store';
import { AuthenticationRoutingModule, AuthenticationStateModule } from '@labdat/authentication';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';
import { metaReducers } from './+state/app.reducer';
import { environment } from '../environments/environment';
import { RouterStateModule } from '@labdat/common/router-state';
// import { ConnectFormStateModule } from '@labdat/connect-form-state';
import { taskConfiguration, TaskRoutingModule, TaskStateModule } from '@labdat/task';
// import { FormlyModule } from '@ngx-formly/core';
import { AdminRoutingModule, UserStateModule } from '@labdat/admin';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    NxModule.forRoot(),
    BrowserModule,
    RouterModule/*.forRoot([], { initialNavigation: 'enabled' })*/,
    BrowserAnimationsModule,
    MatIconModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    RouterStateModule.forRoot(),
    RouterModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    AuthenticationRoutingModule.forRoot(),
    AdminRoutingModule.forRoot(),
    TaskRoutingModule.forRoot(),

    CoreStateModule.forRoot([ coreConfiguration.self, taskConfiguration.core ]),
    AuthenticationStateModule.forRoot(),
    UserStateModule.forRoot(),
    TaskStateModule.forRoot(),

    CoreViewModule
//    ConnectFormStateModule,
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
