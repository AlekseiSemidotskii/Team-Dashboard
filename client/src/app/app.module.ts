import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlannedIssuesComponent } from './issues/planned/planned-issues.component';
import { PlannedIssuesService } from './issues/planned/planned-issues.service';
import { ApiUrlService } from './config/api-url.service';
import { IssueTimePipe } from './issues/issue-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PlannedIssuesComponent,
    IssueTimePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ HttpClient, PlannedIssuesService, ApiUrlService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
