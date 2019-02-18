import { TestBed } from '@angular/core/testing';

import { SnackMessageService } from './snack-message.service';

describe('SnackMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnackMessageService = TestBed.get(SnackMessageService);
    expect(service).toBeTruthy();
  });
});
