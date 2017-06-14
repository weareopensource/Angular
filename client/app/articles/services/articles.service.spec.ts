import { TestBed, inject } from '@angular/core/testing';

import { ArticlesService } from './articles.service';
import {Http} from '@angular/http';

describe('ArticlesService', () => {
  const HttpMock = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticlesService, {provide: Http, useValue : HttpMock}],
    });
  });

  it('should ...', inject([ArticlesService], (service: ArticlesService) => {
    expect(service).toBeTruthy();
  }));
});
