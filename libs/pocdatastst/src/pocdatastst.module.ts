import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MatCardModule,
  MatDialogModule,
  MatTooltipModule
 } from '@angular/material';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

import { CollapsibleModule } from 'angular2-collapsible';


import { PocdataststComponent } from './components';
import { KeysPipe, LineBreaksPipe, RecognitionDisplayPipe, SentimentDisplayPipe } from './services';

import { DndModule } from 'ng2-dnd';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SenseGaugeChartComponent, SumGaugeChartComponent } from '@labdat/charts';

import { GaugeModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { PocdataststRoutingModule } from '@labdat/pocdatastst-routing';

const COMPONENTS = [
  PocdataststComponent,
  KeysPipe,
  LineBreaksPipe,
  RecognitionDisplayPipe,
  SentimentDisplayPipe,
  SenseGaugeChartComponent,
  SumGaugeChartComponent
];

const MATERIAL_MODULES = [
  MatCardModule,
  MatDialogModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ...MATERIAL_MODULES,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CollapsibleModule,
    DndModule.forRoot(),
    GaugeModule,
    NgxChartsModule,
    PocdataststRoutingModule
  ],
  declarations: [
    PocdataststComponent,
    KeysPipe,
    LineBreaksPipe,
    RecognitionDisplayPipe,
    SentimentDisplayPipe,
    SenseGaugeChartComponent,
    SumGaugeChartComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PocdataststModule {
}
