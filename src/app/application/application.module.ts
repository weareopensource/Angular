import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApplicationStoreModule } from './+store/application-store.module';
import { CoreModule } from 'app/core';
import { AuthenticationModule } from 'app/authentication';
import { ApplicationComponent } from './components/application/application.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    // DBModule.provideDB(schema),
    ApplicationStoreModule,    
    SharedModule.forRoot(),
    AuthenticationModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [ ApplicationComponent ]
})
export class ApplicationModule { }
