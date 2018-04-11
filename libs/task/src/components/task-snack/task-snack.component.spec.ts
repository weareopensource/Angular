import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSnackComponent } from './task-snack.component';

describe('TaskSnackComponent', () => {
  let component: TaskSnackComponent;
  let fixture: ComponentFixture<TaskSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSnackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
