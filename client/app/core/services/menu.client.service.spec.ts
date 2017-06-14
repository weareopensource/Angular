import { TestBed, inject } from '@angular/core/testing';

import { MenuService } from './menu.client.service';

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService]
    });
  });

  it('should ...', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
  }));
});
