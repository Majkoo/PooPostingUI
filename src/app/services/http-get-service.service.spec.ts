import { TestBed } from '@angular/core/testing';

import { HttpGetServiceService } from './http-get-service.service';

describe('HttpGetServiceService', () => {
  let service: HttpGetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpGetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
