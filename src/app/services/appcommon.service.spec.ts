import { TestBed } from '@angular/core/testing';

import { AppcommonService } from './appcommon.service';

describe('AppcommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppcommonService = TestBed.get(AppcommonService);
    expect(service).toBeTruthy();
  });
});
