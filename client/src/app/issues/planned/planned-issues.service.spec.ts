import { TestBed, inject } from '@angular/core/testing';

import { PlannedIssuesService } from './planned-issues.service';

describe('PlannedIssuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlannedIssuesService]
    });
  });

  it('should be created', inject([PlannedIssuesService], (service: PlannedIssuesService) => {
    expect(service).toBeTruthy();
  }));
});
