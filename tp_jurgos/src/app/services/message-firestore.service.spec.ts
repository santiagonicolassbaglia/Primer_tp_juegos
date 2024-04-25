import { TestBed } from '@angular/core/testing';

import { MessageFirestoreService } from './message-firestore.service';

describe('MessageFirestoreService', () => {
  let service: MessageFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
