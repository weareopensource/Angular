import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddDialogComponent } from './task-add.dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskAddDialogComponent', () => {
  let component: TaskAddDialogComponent;
  let fixture: ComponentFixture<TaskAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormlyModule.forRoot(),
        FormlyMaterialModule,
        MatDialogModule,
        NoopAnimationsModule
      ],
      declarations: [ TaskAddDialogComponent ],
      providers: [ { provide: MatDialogRef, useValue: { open: () => {}} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
