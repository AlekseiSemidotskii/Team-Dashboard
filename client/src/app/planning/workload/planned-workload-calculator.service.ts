import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map as rxmap } from 'rxjs/operators';

import { PlannedIssuesService } from '../planned-issues.service';
import { AssigneeWorkload } from './assignee-workload';

@Injectable()
export class PlannedWorkloadCalculatorService {

    constructor (private plannedIssueService: PlannedIssuesService) {}

    calculateAssigneesWorkload (): Observable<AssigneeWorkload[]> {

        return this.plannedIssueService.getPlannedIssues().pipe(rxmap(issues => {

            const assigneesTotals = issues.reduce( (r, issue) => {
                const assigneeName = issue.assignee.displayName;
                r[assigneeName] = r[assigneeName] || new AssigneeWorkload(assigneeName);
                r[assigneeName].timeTracking.increase(issue.timeTracking.originalEstimateSeconds, issue.timeTracking.spentTimeSeconds);
                return r;
            }, Object.create(null));

            const workload = [];
            Object.keys(assigneesTotals).forEach(assigneeWorkload => {
                workload.push(assigneesTotals[assigneeWorkload]);
            });
            return workload;
        }));
    }
}
