import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// MATERIAL DESIGN MODULES
import { MaterialModule } from '@angular/material';

// HTTP PROVIDER
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

// CORE COMPONENTS
import { AppToolbarComponent, AppSidenavComponent, NotFoundPageComponent, BadRequestPageComponent,
   ForbidenComponent } from './components';

// CORE SERVICES
import { MenuService, InterceptedHttp } from './services';
import { SessionActions } from './actions';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,
         router: Router, actions: SessionActions): Http {
  return new InterceptedHttp(xhrBackend, requestOptions, router, actions);
}

@NgModule({
  imports: [
    RouterModule,
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
