import { TestBed } from '@angular/core/testing';

import { StudentAuthguardGuard } from './student-authguard.guard';

describe('StudentAuthguardGuard', () => {
  let guard: StudentAuthguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StudentAuthguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
