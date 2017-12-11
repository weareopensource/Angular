import { CommandDetailComponent } from './components/detail/detail.component';
import { CommandsListComponent } from './components/list/list.component';
import { CommandDeleteDialog } from './components/delete/delete.dialog';
import { CommandEditComponent } from './components/detail/edit/edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommandRoutingModule } from './+routing/command-routing.module';
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
import { NgxGalleryModule } from 'ngx-gallery';
import { SharedModule } from 'app/shared/shared.module';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const COMPONENTS = [
  CommandsListComponent,
  CommandDetailComponent,
  CommandDeleteDialog,
  CommandEditComponent
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
    CommandDeleteDialog
  ]
})
export class CommandModule {}

@NgModule({
  imports: [
    CommandModule,
    CommandRoutingModule
  ]
})
export class RootCommandModule { }
