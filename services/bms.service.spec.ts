import { TestBed } from '@angular/core/testing';

import { BmsService } from './bms.service';

describe('BmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BmsService = TestBed.get(BmsService);
    expect(service).toBeTruthy();
  });
});
