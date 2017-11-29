import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map as rxmap } from 'rxjs/operators'

import IssueViewModel from '../issueViewModel';
import { ApiUrlService } from '../../config/api-url.service';
import UserViewModel from '../userViewModel';
import { TimeTrackingViewModel } from '../timeTrackingViewModel';

@Injectable()
export class PlannedIssuesService {

  PLANNED_ISSUES_URL = '/issues/planned'; 

  constructor(private apiUrlService: ApiUrlService, private http: HttpClient) { 

  }

  getPlannedIssues(): Observable<IssueViewModel[]> {
    return this.http.get<IssueViewModel[]>(this.apiUrlService.apiUrl + this.PLANNED_ISSUES_URL)
      .pipe(rxmap(res => res.map(
        i => new IssueViewModel(
                  i.externalUrl, 
                  i.key, 
                  i.summary, 
                  new UserViewModel(i.reporter.login, i.reporter.displayName),
                  new UserViewModel(i.assignee.login, i.assignee.displayName), 
                  i.type, 
                  i.status,
                  new TimeTrackingViewModel(i.timeTracking.originalEstimateSeconds, i.timeTracking.spentTimeSeconds)
        ))));
  }
}