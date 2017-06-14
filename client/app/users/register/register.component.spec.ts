/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs/Rx';
import { SessionActions } from '../../core/index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  class UsersServiceLock {
    signup(model) {
      return Observable.of({
        'user':
        {
          'displayName': 'firstname lastname',
          'provider': 'local',
          'username': 'user01',
          'created': '2017-04-21T12:25:11.178Z',
          'roles': ['user'],
          'profileImageURL': 'modules/users/client/img/profile/default.png',
          'email': 'user01@mean.io',
          'lastName': 'lastname',
          'firstName': 'firstname'
        }
      });
    }
  }
  const sessionActionMock = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, MaterialModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [{ provide: UsersService, useClass: UsersServiceLock },
      { provide: SessionActions, useValue: sessionActionMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
