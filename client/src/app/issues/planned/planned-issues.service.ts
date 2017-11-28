import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import IssueViewModel from '../issueViewModel';

@Injectable()
export class PlannedIssuesService {

  private issuesUrl = 'http://localhost:3300/api/issues/planned'; 

  constructor(private http: HttpClient) { 

  }

  getPlannedIssues(): Observable<IssueViewModel[]> {
    return this.http.get<IssueViewModel[]>(this.issuesUrl);
  }
}