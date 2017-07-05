import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from '@angular/material';
import { ProfileComponent } from './profile/index';
import { PasswordComponent } from './password/index';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionActions } from '../../core/index';
import { NgReduxModule } from '@angular-redux/store';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  const sessionActionMock = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent, ProfileComponent, PasswordComponent ],
      imports : [BrowserAnimationsModule, MaterialModule, ReactiveFormsModule, NgReduxModule],
      providers: [{ provide: SessionActions, useValue: sessionActionMock }]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
