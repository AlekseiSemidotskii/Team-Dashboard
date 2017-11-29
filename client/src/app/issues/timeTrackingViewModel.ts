import WorkTimeConfig from './workTimeConfig';

export class TimeTrackingViewModel {

    remainingTimeSeconds: number;

    constructor (public originalEstimateSeconds: number, public spentTimeSeconds: number) {
        this.recalculateRemainingTimeSeconds();
    }

    increase(originalEstimateSeconds: number, spentTimeSeconds: number): void {
        this.originalEstimateSeconds += originalEstimateSeconds;
        this.spentTimeSeconds += spentTimeSeconds;
        this.recalculateRemainingTimeSeconds();
    }

    private recalculateRemainingTimeSeconds(): void {
        this.remainingTimeSeconds = this.spentTimeSeconds
            ? this.originalEstimateSeconds - this.spentTimeSeconds
            : this.originalEstimateSeconds;
    }
}
