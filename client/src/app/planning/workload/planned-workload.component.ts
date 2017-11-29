import { Component, OnInit } from '@angular/core';
import { PlannedWorkloadCalculatorService } from './planned-workload-calculator.service';
import { AssigneeWorkload } from './assignee-workload';
import { TimeTrackingViewModel } from '../../issues/timeTrackingViewModel';

@Component({
  selector: 'app-planned-workload',
  templateUrl: './planned-workload.component.html'
})

export class PlannedWorkloadComponent implements OnInit {

  workload: AssigneeWorkload[];

  constructor(private plannedWorkloadCalculatorService: PlannedWorkloadCalculatorService) { }

  ngOnInit() {
    this.calculateWorkload();
  }

  calculateWorkload (): void {
    this.plannedWorkloadCalculatorService.calculateAssigneesWorkload()
        .subscribe(r => {
          this.workload = r;
        });
  }

}
