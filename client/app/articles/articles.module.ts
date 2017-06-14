import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL DESIGN MODULES
import { MaterialModule, OverlayContainer, TooltipPosition } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

// ARTICLES COMPONENTS
import { ArticlesComponent, ArticlesListComponent, ArticleDetailsComponent, ArticleComponent } from '.';

// ARTICLES SERVICES
import {ArticlesService} from '.';

// ARTICLES ROUTES MODULE
import { ArticlesRoutingModule } from ".";
import { CoreModule } from "app/core";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    ArticlesRoutingModule
  ],
  declarations: [
    ArticlesComponent,
    ArticlesListComponent,
    ArticleDetailsComponent,
    ArticleComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [OverlayContainer, ArticlesService],

})
export class ArticlesModule {}
