import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from './services/authentication.guard.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    AuthenticationGuardService,
  ]
})
export class AuthenticationRoutingModule {}
