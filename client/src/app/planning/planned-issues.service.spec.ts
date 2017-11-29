import { TestBed, inject } from '@angular/core/testing';

import { PlannedIssuesService } from './planned-issues.service';
import { ApiUrlService } from '../config/api-url.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PlannedIssuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [PlannedIssuesService, ApiUrlService]
    });
  });

  it('should be created', inject([PlannedIssuesService], (service: PlannedIssuesService) => {
    expect(service).toBeTruthy();
  }));
});
