// all estimates in minutes

export class IssueTimeTracking {
    
    public remainingTimeSeconds: number;

    public originalEstimateText: string;
    public spentTimeText: string;
    public remainingTimeText: string;

    constructor (public originalEstimateSeconds: number, public spentTimeSeconds: number, workTimeConfig: WorkTimeConfig) {
        this.remainingTimeSeconds = spentTimeSeconds ? originalEstimateSeconds - spentTimeSeconds : originalEstimateSeconds;
        this.originalEstimateText = this.buildDisplayTime(originalEstimateSeconds, workTimeConfig);
        this.spentTimeText = this.buildDisplayTime(spentTimeSeconds, workTimeConfig);
        this.remainingTimeText = this.buildDisplayTime(this.remainingTimeSeconds, workTimeConfig);
    }

    private buildDisplayTime(time: number, workingTimeConfig: WorkTimeConfig) : string {
        // weeks, days, hours, minutes
        let remainder = time;
        const secondsInWeek = workingTimeConfig.daysInWeek * workingTimeConfig.hoursInDay * SecondsCount.InHour;
        const secondsInDay = workingTimeConfig.hoursInDay * SecondsCount.InHour;
        
        const weeks = Math.floor(remainder/secondsInWeek);
        remainder %= secondsInWeek;
        const days = Math.floor(remainder/secondsInDay);
        remainder %= secondsInDay;
        const hours = Math.floor(remainder/SecondsCount.InHour);
        remainder %= SecondsCount.InHour;
        const minutes = Math.floor(remainder/SecondsCount.InMinute);

        let timeString = '';
        if(weeks != 0) timeString+=`${weeks} weeks `;
        if(days != 0) timeString+=`${days} days `;
        if(hours != 0) timeString+=`${hours} hours `;
        if(minutes != 0) timeString+=`${minutes} minutes `;
        return timeString.trim();
    }
}

export class WorkTimeConfig {

    constructor (public daysInWeek: number, public hoursInDay: number) {

    }
}

enum SecondsCount {
    InHour = 3600,
    InMinute = 60
}