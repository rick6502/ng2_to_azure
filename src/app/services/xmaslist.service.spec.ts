import { TestBed } from '@angular/core/testing';

import { XmaslistService } from './xmaslist.service';

describe('XmaslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XmaslistService = TestBed.get(XmaslistService);
    expect(service).toBeTruthy();
  });
});
