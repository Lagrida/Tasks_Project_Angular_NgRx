import { TestBed } from '@angular/core/testing';

import { AuthTasksService } from './auth-tasks.service';

describe('AuthTasksService', () => {
  let service: AuthTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
