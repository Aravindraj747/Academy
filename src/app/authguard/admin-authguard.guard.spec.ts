import { TestBed } from '@angular/core/testing';

import { AdminAuthguardGuard } from './admin-authguard.guard';

describe('AdminAuthguardGuard', () => {
  let guard: AdminAuthguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminAuthguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
