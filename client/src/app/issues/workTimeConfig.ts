export default class WorkTimeConfig {
    constructor (public daysInWeek: number, public hoursInDay: number) {

    }

    static defaultConfig(): WorkTimeConfig {
        return new WorkTimeConfig(5, 8);
    }
}
