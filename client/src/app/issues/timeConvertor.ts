import WorkTimeConfig from './workTimeConfig';

enum SecondsCount {
    InHour = 3600,
    InMinute = 60
}

export enum TimeRound {
    Minute = 0,
    Hour = 1,
    Day = 2,
    Week = 3
}

export class TimeConvertor {

    public static buildDisplayTime(time: number, timeRoundTo: TimeRound = TimeRound.Minute, workingTimeConfig?: WorkTimeConfig): string {
        // weeks, days, hours, minutes
        let remainder = Math.abs(time);

        const timeConfig = workingTimeConfig ? workingTimeConfig : WorkTimeConfig.defaultConfig();

        const secondsInWeek = timeConfig.daysInWeek * timeConfig.hoursInDay * SecondsCount.InHour;
        const secondsInDay = timeConfig.hoursInDay * SecondsCount.InHour;
        const weeks = Math.floor(remainder / secondsInWeek);
        remainder %= secondsInWeek;
        const days = Math.floor(remainder / secondsInDay);
        remainder %= secondsInDay;
        const hours = Math.floor(remainder / SecondsCount.InHour);
        remainder %= SecondsCount.InHour;
        const minutes = Math.floor(remainder / SecondsCount.InMinute);

        let timeString = '';
        if (weeks !== 0 && timeRoundTo <= 3) {
            timeString += `${weeks} weeks `;
        }
        if (days !== 0 && timeRoundTo <= 2) {
            timeString += `${days} days `;
        }
        if (hours !== 0 && timeRoundTo <= 1) {
            timeString += `${hours} hours `;
        }
        if (minutes !== 0 && timeRoundTo === 0) {
            timeString += `${minutes} minutes `;
        }
        if (time < 0) {
            timeString = '-' + timeString;
        }
        return timeString.trim();
    }
}
