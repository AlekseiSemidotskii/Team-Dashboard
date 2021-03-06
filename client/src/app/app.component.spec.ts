import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PlannedIssuesService } from './planning/planned-issues.service';
import { ApiUrlService } from './config/api-url.service';
import { PlannedIssuesComponent } from './planning/issues/planned-issues.component';
import { IssueTimePipe } from './issues/issue-time.pipe';
import { PlanningBoardComponent } from './planning/board/planning-board.component';
import { PlannedWorkloadComponent } from './planning/workload/planned-workload.component';
import { PlannedWorkloadCalculatorService } from './planning/workload/planned-workload-calculator.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PlanningBoardComponent,
        PlannedIssuesComponent,
        PlannedWorkloadComponent,
        IssueTimePipe
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [PlannedIssuesService, ApiUrlService, PlannedWorkloadCalculatorService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Team Dashboard'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Team Dashboard');
  }));

  /*it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Team Dashboard!');
  }));*/
});
