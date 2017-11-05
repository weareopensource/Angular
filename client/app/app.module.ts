import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { DBModule } from '@ngrx/db';
// import { schema } from './auth/store/db';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';

import { environment } from 'environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthenticationModule } from './authentication/authentication.module';

import { reducer, metaReducers } from './store';

import { AppComponent } from './core/components';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducer, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    // DBModule.provideDB(schema),
    AppRoutingModule,

    AuthenticationModule.forRoot(),
    CoreModule.forRoot()
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
