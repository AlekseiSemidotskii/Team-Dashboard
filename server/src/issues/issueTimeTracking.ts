export class IssueTimeTracking {
    
    constructor (public originalEstimateSeconds: number, public spentTimeSeconds: number) {

    }
}

export class WorkTimeConfig {

    constructor (public daysInWeek: number, public hoursInDay: number) {

    }
}