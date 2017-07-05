import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordComponent } from './password.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {SessionActions} from '../../../core/index';
import { NgReduxModule } from '@angular-redux/store';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  const sessionActionMock = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordComponent ],
      imports : [BrowserAnimationsModule, ReactiveFormsModule, MaterialModule, NgReduxModule],
      providers: [{ provide: SessionActions, useValue: sessionActionMock }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
