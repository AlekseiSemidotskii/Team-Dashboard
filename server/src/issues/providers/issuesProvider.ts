import Issue from '../issue';

export default interface IIssuesProvider {
    getIssue (issueKey: string) : Promise<Issue> ;
    getPlannedIssues() : Promise<Issue[]> ;
}