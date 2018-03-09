import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreRoutingModule } from '@labdat/core-routing';
import { AuthenticationModule } from '@labdat/authentication';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
  //  MatProgressBarModule
} from '@angular/material';
import { SidenavModule } from '@labdat/sidenav';

export const COMPONENTS = [LayoutComponent, HomeComponent, NotFoundComponent];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatListModule
  //  MatProgressBarModule
];

@NgModule({
  imports: [CommonModule, RouterModule, SidenavModule, AuthenticationModule, ...MATERIAL_MODULES, FlexLayoutModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootCoreModule
    };
  }
}

@NgModule({
  imports: [CoreModule, CoreRoutingModule]
})
export class RootCoreModule {}
