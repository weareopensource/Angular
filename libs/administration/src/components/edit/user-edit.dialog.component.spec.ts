import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditDialogComponent } from './user-edit.dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserEditDialogComponent', () => {
  let component: UserEditDialogComponent;
  let fixture: ComponentFixture<UserEditDialogComponent>;

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
      declarations: [ UserEditDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {open: () => {}} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
