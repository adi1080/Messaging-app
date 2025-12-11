import { TestBed } from '@angular/core/testing';

import { CannedResponsesService } from './canned-responses.service';

describe('CannedResponsesService', () => {
  let service: CannedResponsesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CannedResponsesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
