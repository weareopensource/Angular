import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomableTreemapChartComponent } from './zoomable-treemap-chart.component';

describe('ZoomableTreemapChartComponent', () => {
  let component: ZoomableTreemapChartComponent;
  let fixture: ComponentFixture<ZoomableTreemapChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomableTreemapChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomableTreemapChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
