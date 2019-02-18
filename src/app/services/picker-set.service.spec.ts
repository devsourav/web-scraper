import { TestBed } from '@angular/core/testing';

import { PickerSetService } from './picker-set.service';

describe('PickerSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickerSetService = TestBed.get(PickerSetService);
    expect(service).toBeTruthy();
  });
});
