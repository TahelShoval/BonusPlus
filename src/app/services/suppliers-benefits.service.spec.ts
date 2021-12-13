import { TestBed } from '@angular/core/testing';

import { SuppliersBenefitsService } from './suppliers-benefits.service';

describe('SuppliersBenefitsService', () => {
  let service: SuppliersBenefitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuppliersBenefitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
