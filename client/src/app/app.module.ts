import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlannedIssuesComponent } from './planning/issues/planned-issues.component';
import { PlannedIssuesService } from './planning/planned-issues.service';
import { ApiUrlService } from './config/api-url.service';
import { IssueTimePipe } from './issues/issue-time.pipe';
import { PlanningBoardComponent } from './planning/board/planning-board.component';
import { PlannedWorkloadComponent } from './planning/workload/planned-workload.component';
import { PlannedWorkloadCalculatorService } from './planning/workload/planned-workload-calculator.service';

@NgModule({
  declarations: [
    AppComponent,
    PlanningBoardComponent,
    PlannedIssuesComponent,
    PlannedWorkloadComponent,
    IssueTimePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ HttpClient, ApiUrlService,
               PlannedIssuesService, PlannedWorkloadCalculatorService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
