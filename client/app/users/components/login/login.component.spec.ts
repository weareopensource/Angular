/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { SessionActions } from 'app/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgReduxRouter } from '@angular-redux/router';
import { UsersService } from '../../services';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  class SessionActionMock {
    loginUser = () => {
      return Observable.of({
        'user': {
          'displayName': 'firstname lastname',
          'provider': 'local',
          'username': 'user01',
          'updated': '2017-04-24T11:46:39.663Z',
          'resetPasswordExpires': '2017-04-11T08:42:03.959Z',
          'resetPasswordToken': 'c71c89964befd6a16fe6565d89fe0c2d18d725b2',
          'created': '2017-03-31T08:55:11.633Z',
          'roles': ['admin'],
          'profileImageURL': 'modules/users/client/img/profile/default.png',
          'email': 'user01@mean.io',
          'lastName': 'lastname',
          'firstName': 'firstname'
        }
      });
    }
  }
  class UsersServiceLock {
    signup(model) {
      return Observable.of({'user':
        {'displayName': 'test test',
          'provider': 'local',
          'username': 'test',
          'created': '2017-04-26T10:20:23.310Z',
          'roles': ['user'],
          'profileImageURL': 'modules/users/client/img/profile/default.png',
          'email': 'test@mean.io',
          'lastName': 'test',
          'firstName': 'test'}
      });
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NgReduxTestingModule,
        NgReduxModule
        ],
      providers: [
        { provide: SessionActions, useClass: SessionActionMock },
        {provide: UsersService, useClass: UsersServiceLock},
        MockNgRedux,
        NgReduxRouter]

    })
    .compileComponents();
    MockNgRedux.reset();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
