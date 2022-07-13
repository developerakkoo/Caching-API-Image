import { TestBed } from '@angular/core/testing';

import { CatchingService } from './catching.service';

describe('CatchingService', () => {
  let service: CatchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
