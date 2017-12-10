import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from 'app/authentication/+routing/authentication-routing.module';

@NgModule({
  imports: [
    AuthenticationRoutingModule.forRoot(),
  ]
})
export class ApplicationRoutingModule { }
