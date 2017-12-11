import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreRoutingModule } from 'app/core/+routing/core-routing.module';
import { Store, StoreModule } from '@ngrx/store';

export const COMPONENTS = [
  HomeComponent,
  NotFoundComponent
];

const MATERIAL_MODULES = [ MatCardModule ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootCoreModule,
    }
  }
}

@NgModule({
  imports: [
    CoreModule,
    CoreRoutingModule
  ]
})
export class RootCoreModule { }
