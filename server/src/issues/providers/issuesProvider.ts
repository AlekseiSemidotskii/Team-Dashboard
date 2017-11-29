import Issue from '../issue';
import { WorkTimeConfig } from '../issueTimeTracking';

export default interface IIssuesProvider {
    getIssue (issueKey: string) : Promise<Issue> ;
    getPlannedIssues() : Promise<Issue[]> ;
    getWorkTimeConfig(): WorkTimeConfig;
}