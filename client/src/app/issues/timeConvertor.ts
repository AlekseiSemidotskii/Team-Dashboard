import WorkTimeConfig from './workTimeConfig';

export default class TimeConvertor {

    public static buildDisplayTime(time: number, workingTimeConfig?: WorkTimeConfig) : string {
        // weeks, days, hours, minutes
        let remainder = time;

        let timeConfig = workingTimeConfig ? workingTimeConfig : WorkTimeConfig.defaultConfig();

        const secondsInWeek = timeConfig.daysInWeek * timeConfig.hoursInDay * SecondsCount.InHour;
        const secondsInDay = timeConfig.hoursInDay * SecondsCount.InHour;
        
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
   
enum SecondsCount {
    InHour = 3600,
    InMinute = 60
}