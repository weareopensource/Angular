
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL DESIGN MODULES
import { OverlayContainer } from '@angular/cdk/overlay';
import {
    MatTooltipModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatToolbarModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';

// NGX-CHARTS MODULE
import { PieChartModule, GaugeModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { CodemirrorModule } from 'ng2-codemirror';

// DRAG & DROP MODULE
import { DndModule } from 'ng2-dnd';

// HANDSONTABLE MODULE
//import { HotTableModule } from 'ng2-handsontable';


import {SlidesSearchComponent} from './components/slides-list/slides-search/slides-search.component';
// SLIDES COMPONENTS
import {
    SlidesViewComponent,
    FullScreenGraphSlideComponent,
    ImageComponent,
    TitleSlideComponent,
    LeftGraphRightTextSlideComponent,
    RightGraphLeftTextSlideComponent,
    TextSlideComponent,
    SlidesEditorFormComponent,
    SlideCardComponent
} from './components';

// SLIDES SERVICES
import { SlidesService, ImagesService, ValidService, ChartsService } from './services';

// SLIDES ROUTES MODULE
import { SlidesRoutingModule } from './slides-routing.module';
import { CoreModule } from '@labdat/core';
import { FlexLayoutModule } from '@angular/flex-layout';


import { KeySwitchDirective } from './components/slides-view/key-switch.directive';

import { DragulaModule } from 'ng2-dragula';
import {
    BarChartComponent,
    GaugeChartComponent,
    NgGraphComponent,
    TreemapChartComponent,
    ZoomableTreemapChartComponent,
    PieGridChartComponent,
    NumberCardComponent,
    SunburstChartComponent,
    AdvancedPieChartComponent,
    ForceDirectedGraphComponent,
    LineChartComponent,
    DendogramComponent,
    PieChartComponent,
    HierarchicalEdgeBundlingComponent,
    BubbleChartComponent,
    WordCloudComponent,
    AreaChartComponent
 } from '@labdat/charts';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

import { ImageUploadComponent } from './components/slides-editor-form/slides-editor/slide-card/slide-editor/image-upload/image-upload.component';

import { SlidesSettingComponent } from './components/slides-editor-form/slides-editor/slides-setting/slides-setting.component';
import { ChartsBuilderComponent, CodeEditorComponent, DataTableComponent } from './components/slides-editor-form/slides-editor/slide-card/slide-editor/charts-builder';
import { SlidesEditorComponent } from './components/slides-editor-form/slides-editor/slides-editor.component';

import { SlidesListComponent } from './components/slides-list/slides-list.component';
import { SlidesCardComponent } from './components/slides-list/slides-card/slides-card.component';
import { DeleteDialogComponent } from './components/slides-list/slides-card/delete-dialog/delete-dialog.component';
import { ToggleFullscreenDirective } from './components/slides-view/toggle-fullscreen.directive';

import { ValidateOnBlurDirective } from './components/slides-editor-form/slides-editor/slides-setting/validate-on-blur.directive';
import { SlideEditorComponent } from './components/slides-editor-form/slides-editor/slide-card/slide-editor/slide-editor.component';

@NgModule({
    imports: [
        CommonModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        SlidesRoutingModule,
        DragulaModule,
        PieChartModule,
        GaugeModule,
        NgxChartsModule,
        CodemirrorModule,
        FlexLayoutModule,
        DndModule.forRoot(),
//        HotTableModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        MatTooltipModule,
        MatCardModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatChipsModule,
        MatToolbarModule,
        MatInputModule,
        HttpModule
    ],
    entryComponents: [
        BarChartComponent,
        LineChartComponent,
        ForceDirectedGraphComponent,
        HierarchicalEdgeBundlingComponent,
        PieChartComponent,
        PieGridChartComponent,
        NumberCardComponent,
        FullScreenGraphSlideComponent,
        GaugeChartComponent,
        AdvancedPieChartComponent,
        DeleteDialogComponent,
        DendogramComponent,
        NgGraphComponent,
        TreemapChartComponent,
        ZoomableTreemapChartComponent,
        BubbleChartComponent,
        WordCloudComponent,
        SunburstChartComponent,
        AreaChartComponent,
        ImageComponent,
        SlideEditorComponent],

    declarations: [
        KeySwitchDirective,
        SlidesViewComponent,
        SlidesEditorFormComponent,
        SlideCardComponent,
        ImageUploadComponent,
        SlidesSearchComponent,
        BarChartComponent,
        ForceDirectedGraphComponent,
        LineChartComponent,
        SlidesSettingComponent,
        CodeEditorComponent,
        DataTableComponent,
        ChartsBuilderComponent,
        SlidesEditorComponent,
        SlidesListComponent,
        FullScreenGraphSlideComponent,
        GaugeChartComponent,
        AdvancedPieChartComponent,
        TitleSlideComponent,
        LeftGraphRightTextSlideComponent,
        RightGraphLeftTextSlideComponent,
        TextSlideComponent,
        PieChartComponent,
        SlidesCardComponent,
        HierarchicalEdgeBundlingComponent,
        AreaChartComponent,
        PieGridChartComponent,
        NumberCardComponent,
        DeleteDialogComponent,
        NgGraphComponent,
        TreemapChartComponent,
        ZoomableTreemapChartComponent,
        DendogramComponent,
        BubbleChartComponent,
        WordCloudComponent,
        SunburstChartComponent,
        KeySwitchDirective,
        ToggleFullscreenDirective,
        ImageComponent,
        ValidateOnBlurDirective,
        SlideEditorComponent
    ],
    exports: [
      SlidesCardComponent,
      SlidesSearchComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [OverlayContainer, SlidesService, ImagesService, ChartsService, ValidService]

})
export class SlidesModule {
}
