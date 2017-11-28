import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import IssueViewModel from '../issueViewModel';
import { ApiUrlService } from '../../config/api-url.service';

@Injectable()
export class PlannedIssuesService {

  PLANNED_ISSUES_URL = '/issues/planned'; 

  constructor(private apiUrlService: ApiUrlService, private http: HttpClient) { 

  }

  getPlannedIssues(): Observable<IssueViewModel[]> {
    return this.http.get<IssueViewModel[]>(this.apiUrlService.apiUrl + this.PLANNED_ISSUES_URL);
  }
}