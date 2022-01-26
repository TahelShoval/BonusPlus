import { TestBed } from '@angular/core/testing';

import { AuthEmployerGuard } from './auth-employer.guard';

describe('AuthEmployerGuard', () => {
  let guard: AuthEmployerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthEmployerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
