import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// ANGULAR MATERIAL
import { MatCardModule, MatGridListModule } from '@angular/material';

// ARTICLES COMPONENTS
import { ArticlesComponent, ArticlesListComponent, ArticleDetailsComponent, ArticleComponent } from './components';

// ARTICLES SERVICES
import {ArticlesService} from './services';

// ARTICLES ROUTES MODULE
import { ArticlesRoutingModule } from './articles-routing.module';
import { CoreModule } from 'app/core';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
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
  providers: [ArticlesService],

})
export class ArticlesModule {}
