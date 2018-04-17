import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDialogComponent } from './profile.dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { combineReducers, StoreModule } from '@ngrx/store';
import { authenticationReducers } from '@labdat/authentication';
import { userReducer } from '@labdat/administration';
import { routerReducer } from '@ngrx/router-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisableControlDirective } from '../../directives/disable-control/disable-control.directive';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('ProfileDialogComponent', () => {
  let component: ProfileDialogComponent;
  let fixture: ComponentFixture<ProfileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          authentication: combineReducers(authenticationReducers),
          user: combineReducers(userReducer),
          router: combineReducers(routerReducer)
        }),
        NoopAnimationsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { open: () => {} }},
      ],
      declarations: [ ProfileDialogComponent, DisableControlDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
