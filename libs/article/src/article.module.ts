import { ArticleDeleteDialog } from './components/delete/delete.dialog';
import { ArticleDetailComponent } from './components/detail/detail.component';
import { ArticlesListComponent } from './components/list/list.component';
import { ArticleEditComponent } from './components/edit/edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleRoutingModule } from '@labdat/article-routing';
import { HttpClientModule } from '@angular/common/http';

import {
  MatButtonModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatTabsModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@labdat/shared';
import { ModuleWithProviders } from '@angular/core';

const COMPONENTS = [
  ArticlesListComponent,
  ArticleDetailComponent,
  ArticleDeleteDialog,
  ArticleEditComponent
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatTabsModule
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    HttpClientModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    NgxGalleryModule,
    RouterModule,
    SharedModule
  ],
  entryComponents: [
    ArticleDeleteDialog
  ]
})
export class ArticleModule {}

@NgModule({
  imports: [
    ArticleModule,
    ArticleRoutingModule
  ],
  providers: [ ]
})
export class RootArticleModule { }
