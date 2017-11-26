import { Test2RoutingModule } from './test2-routing.module';
import { TestComponent } from './components';
import {  } from './components';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  TestComponent
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [ ...COMPONENTS ],
})
export class Test2Module { }

@NgModule({
  imports: [
    Test2Module,
    Test2RoutingModule
  ]
})
export class RootTest2Module { }
