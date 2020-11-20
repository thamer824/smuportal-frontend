import { TestBed } from '@angular/core/testing';

import { TwoauthService } from './twoauth.service';

describe('TwoauthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwoauthService = TestBed.get(TwoauthService);
    expect(service).toBeTruthy();
  });
});
