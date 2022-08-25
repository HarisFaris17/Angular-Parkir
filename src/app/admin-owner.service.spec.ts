import { TestBed } from '@angular/core/testing';

import { AdminOwnerService } from './admin-owner.service';

describe('AdminOwnerService', () => {
  let service: AdminOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
