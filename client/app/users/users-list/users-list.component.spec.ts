import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { UsersListComponent } from './users-list.component';
import { SessionActions } from '../../core/index';
import { UsersService } from '../services/index';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  class SessionActionsMock { };
  class UsersServiceLock {
    getUsers() {
      return Observable.of([{
        'displayName': 'firstname lastname',
        'provider': 'local',
        'username': 'user01',
        'created': '2017-04-21T12:25:11.178Z',
        'roles': ['user'],
        'profileImageURL': 'modules/users/client/img/profile/default.png',
        'email': 'user01@mean.io',
        'lastName': 'lastname',
        'firstName': 'firstname'
      }, {
        'displayName': 'firstname2 lastname2',
        'provider': 'local',
        'username': 'user02',
        'updated': '2017-04-12T13:20:02.060Z',
        'created': '2017-04-12T10:27:47.956Z',
        'roles': ['user'],
        'profileImageURL': 'modules/users/client/img/profile/default.png',
        'email': 'user02@mean.io',
        'lastName': 'lastname2',
        'firstName': 'firstname2'
      }]);
    };
  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [MaterialModule, RouterTestingModule],
      providers: [
        { provide: SessionActions, useClass: SessionActionsMock },
        { provide: UsersService, useClass: UsersServiceLock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
