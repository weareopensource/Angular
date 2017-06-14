/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersService } from './users.service';
import {Http} from '@angular/http';

describe('UsersService', () => {
  const HttpMock = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService, {provide: Http, useValue : HttpMock}]
    });
  });

  it('should ...', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));
});
