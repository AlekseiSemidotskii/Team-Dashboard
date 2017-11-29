import UserViewModel from './userViewModel';
import { TimeTrackingViewModel } from './timeTrackingViewModel';

export default class IssueViewModel {
    constructor (public externalUrl: string,
                 public key: string,
                 public summary: string,
                 public category: string,
                 public reporter: UserViewModel,
                 public assignee: UserViewModel,
                 public type: string,
                 public status: string,
                 public timeTracking: TimeTrackingViewModel) {

    }
}
