import { TestBed } from '@angular/core/testing';

import { WorkersBenefitsService } from './workers-benefits.service';

describe('WorkersBenefitsService', () => {
  let service: WorkersBenefitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkersBenefitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
