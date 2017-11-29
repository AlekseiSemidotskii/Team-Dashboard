import { Component, OnInit } from '@angular/core';
import { PlannedWorkloadCalculatorService } from './planned-workload-calculator.service';
import { AssigneeWorkload } from './assignee-workload';
import { TimeTrackingViewModel } from '../../issues/timeTrackingViewModel';
import { retry } from 'rxjs/operators/retry';

@Component({
  selector: 'app-planned-workload',
  templateUrl: './planned-workload.component.html'
})

export class PlannedWorkloadComponent implements OnInit {

  workload: AssigneeWorkload[];
  workloadTotals: TimeTrackingViewModel;

  constructor(private plannedWorkloadCalculatorService: PlannedWorkloadCalculatorService) {
    this.workloadTotals = new TimeTrackingViewModel(0, 0);
  }

  ngOnInit() {
    this.calculateWorkload();
  }

  calculateWorkload (): void {

    this.plannedWorkloadCalculatorService.calculateAssigneesWorkload()
        .subscribe(r => {
          this.workload = r;
          this.workloadTotals = r.reduce((total, current) => {
            total.increase(current.timeTracking.originalEstimateSeconds, current.timeTracking.spentTimeSeconds);
            return total;
          }, new TimeTrackingViewModel(0, 0));
        });
  }
}
