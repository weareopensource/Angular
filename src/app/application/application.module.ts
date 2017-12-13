import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApplicationComponent } from './components/application/application.component';

import { ApplicationStoreModule } from 'app/application/+store/application-store.module';
import { CoreModule } from 'app/core/core.module';
import { AuthenticationModule } from 'app/authentication/authentication.module';
import { SharedModule } from 'app/shared/shared.module';
import { NxModule } from '@nrwl/nx';

@NgModule({
  declarations: [ ApplicationComponent ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    // DBModule.provideDB(schema),
    NxModule.forRoot(),
    ApplicationStoreModule,    
    SharedModule.forRoot(),
    AuthenticationModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [ ApplicationComponent ]
})
export class ApplicationModule { }
