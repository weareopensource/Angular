import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadRequestPageComponent } from './bad-request-page.component';

describe('BadRequestPageComponent', () => {
  let component: BadRequestPageComponent;
  let fixture: ComponentFixture<BadRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
