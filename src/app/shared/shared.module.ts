import { UploadImagesComponent, ListImagesComponent, AudioComponent } from './components';
import { DropFilesDirective } from './directives';
import { UploadImagesService, FileDatabase, FileDataSource } from './services';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxGalleryModule } from 'ngx-gallery';
import {
  Mean2Sidenav,
  Mean2DrawerContainer,
  Mean2Drawer,
  Mean2SidenavContainer,
  Mean2DrawerContent,
  Mean2SidenavContent } from './components';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatTooltipModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatCardModule
} from '@angular/material';

import { CommandSelectors } from 'app/command/store';
import { CommandApi } from 'app/command/services';

const COMPONENTS = [
  Mean2DrawerContainer,
  Mean2Drawer,
  Mean2DrawerContent,
  Mean2SidenavContainer,
  Mean2Sidenav,
  Mean2SidenavContent,
  UploadImagesComponent,
  ListImagesComponent,
  AudioComponent
];

const DIRECTIVES = [ DropFilesDirective ];

const PROVIDERS = [
  UploadImagesService,
  FileDatabase,
  FileDataSource
];

const MATERIAL_MODULES = [
  MatIconModule,
  MatTooltipModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatCardModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    NgxGalleryModule
  ],
  declarations: [ ...COMPONENTS, ...DIRECTIVES ],
  exports: [ ...COMPONENTS, ...DIRECTIVES ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: PROVIDERS
    }
  }
}
