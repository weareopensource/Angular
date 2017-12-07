import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { DBModule } from '@ngrx/db';
// import { schema } from './auth/store/db';
import { environment } from 'environments/environment';

import { CoreModule } from './core/core.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AppComponent } from './core/components';
import { SharedModule } from 'app/shared/shared.module';
import { AppStoreModule } from './app-store.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    // DBModule.provideDB(schema),
    SharedModule.forRoot(),
    AppStoreModule,
    AuthenticationModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
