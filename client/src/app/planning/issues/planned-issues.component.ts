import { Component, OnInit } from '@angular/core';
import IssueViewModel from '../../issues/issueViewModel';
import { PlannedIssuesService } from '../planned-issues.service';

@Component({
  selector: 'app-planned-issues',
  templateUrl: './planned-issues.component.html'
})

export class PlannedIssuesComponent implements OnInit  {

  issues: IssueViewModel[];

  constructor (private plannedIssueService: PlannedIssuesService) {

  }

  ngOnInit() {
    this.getPlannedIssues();
  }

  getPlannedIssues (): void {
    this.plannedIssueService.getPlannedIssues()
        .subscribe(issues => this.issues = issues);
  }
}
