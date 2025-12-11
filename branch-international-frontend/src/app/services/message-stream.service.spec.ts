import { TestBed } from '@angular/core/testing';

import { MessageStreamService } from './message-stream.service';

describe('MessageStreamService', () => {
  let service: MessageStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
