// all estimates in minutes

export class IssueTimeTracking {
     
    constructor (public originalEstimateSeconds: number, public spentSeconds: number, 
                 public originalEstimateText: string, public spentText: string) {

    }

    public static buildDisplayTime(time: number, workingTimeConfig: WorkTimeConfig) : string {
        // weeks, days, hours, minutes
        let remainder = time;
        const secondsInWeek = workingTimeConfig.daysInWeek * workingTimeConfig.hoursInDay * SecondsCount.InHour;
        const secondsInDay = workingTimeConfig.hoursInDay * SecondsCount.InHour;
        
        const weeks = Math.round(remainder/secondsInWeek);
        remainder %= secondsInWeek;
        const days = Math.round(remainder/secondsInDay);
        remainder %= secondsInDay;
        const hours = Math.round(remainder/SecondsCount.InHour);
        remainder %= SecondsCount.InHour;
        const minutes = Math.round(remainder/SecondsCount.InMinute);

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