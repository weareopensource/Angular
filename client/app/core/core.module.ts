import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// MATERIAL DESIGN MODULES
import { MaterialModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

// HTTP PROVIDER
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

// CORE COMPONENTS
import { AppToolbarComponent, AppSidenavComponent, NotFoundPageComponent, BadRequestPageComponent,
   ForbidenComponent } from '.';

// CORE SERVICES
import { SessionActions, MenuService, InterceptedHttp } from '.';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,
         router: Router, actions: SessionActions): Http {
  return new InterceptedHttp(xhrBackend, requestOptions, router, actions);
}

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    AngularFontAwesomeModule,
    HttpModule,
    MaterialModule,
    CommonModule
  ],
  declarations: [
    AppToolbarComponent,
    AppSidenavComponent,
    NotFoundPageComponent,
    BadRequestPageComponent,
    ForbidenComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    MenuService,
    { provide: Http,  useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router, SessionActions]}
  ],
  exports: [
    AppToolbarComponent,
    AppSidenavComponent,
    NotFoundPageComponent,
    BadRequestPageComponent,
    ForbidenComponent
  ]
})

export class CoreModule {}
