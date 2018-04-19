import {
  AuthenticationGuardService,
  AuthenticationRoutingModule,
  AuthenticationStateModule,
  ProfileComponent,
  ProfileDialogComponent
} from '@labdat/authentication';
import { AppComponent } from './components/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { coreConfiguration, CoreStateModule, CoreViewModule } from '@labdat/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';
import { metaReducers } from './+state/app.reducer';
import { environment } from '../environments/environment';
import { RouterStateModule } from '@labdat/common/router-state';
// import { ConnectFormStateModule } from '@labdat/connect-form-state';
import { taskConfiguration, TaskRoutingModule, TaskStateModule } from '@labdat/task';
import { AdministrationRoutingModule, UserStateModule } from '@labdat/administration';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NxModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot([{
      path: 'profile',
      outlet: 'profile',
      canActivate: [ AuthenticationGuardService ],
      component: ProfileComponent
    }])/*.forRoot([], { initialNavigation: 'enabled' })*/,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    RouterStateModule.forRoot(),
    RouterModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    AuthenticationRoutingModule.forRoot(),
    AdministrationRoutingModule.forRoot(),
    TaskRoutingModule.forRoot(),

    CoreStateModule.forRoot([ coreConfiguration.self, taskConfiguration.core ]),
    AuthenticationStateModule.forRoot(),
    UserStateModule.forRoot(),
    TaskStateModule.forRoot(),

    CoreViewModule
//    ConnectFormStateModule,
  ],
  declarations: [ AppComponent ],
  entryComponents: [ ProfileDialogComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
