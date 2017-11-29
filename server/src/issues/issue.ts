import User from './user';
import { IssueTimeTracking } from './issueTimeTracking';

export default class Issue {
    
    public timeTracking: IssueTimeTracking;

    constructor (public externalUrl: string, 
                 public key: string, public summary: string, 
                 public category: string,
                 public reporter: User, public assignee: User,
                 public type: string, public status: string, 
                 timeTracking?: IssueTimeTracking) {
        this.timeTracking  = timeTracking;
    }
}