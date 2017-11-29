import { TimeTrackingViewModel } from '../../issues/timeTrackingViewModel';

export class AssigneeWorkload {
    constructor (public assignee: string, public timeTracking: TimeTrackingViewModel = new TimeTrackingViewModel(0, 0)) {}
}
