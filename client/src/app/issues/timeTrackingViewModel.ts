import WorkTimeConfig from './workTimeConfig';
import TimeConvertor from './timeConvertor';

export class TimeTrackingViewModel {

    remainingTimeSeconds: number;

    constructor (public originalEstimateSeconds: number, public spentTimeSeconds: number) {
        this.remainingTimeSeconds = this.spentTimeSeconds
            ? this.originalEstimateSeconds - this.spentTimeSeconds
            : this.originalEstimateSeconds;
    }
}
