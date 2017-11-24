export default class JiraConfig {

    constructor (public url: string, public username: string, public password: string, 
        public plannedIssuesFilterName: string,
        public workDaysInWeek: number = 5,
        public workHoursInDay: number = 8){

    }
}