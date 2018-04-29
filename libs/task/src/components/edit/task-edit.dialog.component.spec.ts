import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditDialogComponent } from './task-edit.dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskEditDialogComponent', () => {
  let component: TaskEditDialogComponent;
  let fixture: ComponentFixture<TaskEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        NoopAnimationsModule
      ],
      declarations: [TaskEditDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { open: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
