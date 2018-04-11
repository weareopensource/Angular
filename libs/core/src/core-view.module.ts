import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreRoutingModule } from './core-routing.module';
import { Mean2Drawer, Mean2DrawerContainer, Mean2DrawerContent } from './components/sidenav/drawer.component';
import { Mean2Sidenav, Mean2SidenavContainer, Mean2SidenavContent } from './components/sidenav/sidenav.component';

// import { AuthenticationModule } from '@labdat/authentication';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
  //  MatProgressBarModule
} from '@angular/material';

const SIDENAV_COMPONENTS = [
  Mean2Drawer,
  Mean2DrawerContainer,
  Mean2DrawerContent,
  Mean2Sidenav,
  Mean2SidenavContainer,
  Mean2SidenavContent
];

export const COMPONENTS = [
  LayoutComponent,
  HomeComponent,
  NotFoundComponent,
  ...SIDENAV_COMPONENTS
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatMenuModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatListModule
  //  MatProgressBarModule
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
//    AuthenticationModule,
    CoreRoutingModule
  ],
  declarations: COMPONENTS
})
export class CoreViewModule { }
