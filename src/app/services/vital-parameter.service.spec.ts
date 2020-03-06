import { TestBed } from '@angular/core/testing';

import { VitalParameterService } from './vital-parameter.service';

describe('VitalParameterService', () => {
  let service: VitalParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VitalParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
