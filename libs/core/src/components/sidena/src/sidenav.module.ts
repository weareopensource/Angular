import { FlexLayoutModule } from '@angular/flex-layout';
import {
  Mean2Drawer,
  Mean2DrawerContainer,
  Mean2DrawerContent,
  Mean2Sidenav,
  Mean2SidenavContainer,
  Mean2SidenavContent
} from './components';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';

const COMPONENTS = [
  Mean2DrawerContainer,
  Mean2Drawer,
  Mean2DrawerContent,
  Mean2SidenavContainer,
  Mean2Sidenav,
  Mean2SidenavContent
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
  imports: [CommonModule, ...MATERIAL_MODULES, FlexLayoutModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SidenavModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SidenavModule
    };
  }
}
