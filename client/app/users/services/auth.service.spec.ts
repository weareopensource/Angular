import { TestBed, inject } from '@angular/core/testing';

import { Auth } from './auth.service';
import { UsersService } from './users.service';
import { NgReduxModule } from '@angular-redux/store';
import { Observable } from 'rxjs/Rx';
describe('AuthService', () => {
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgReduxModule],
      providers: [Auth,
        { provide: UsersService, useClass: UsersServiceLock }]
    });
  });

  it('should ...', inject([Auth], (service: Auth) => {
    expect(service).toBeTruthy();
  }));
});
