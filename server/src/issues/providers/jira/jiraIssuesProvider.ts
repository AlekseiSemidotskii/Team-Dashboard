import JiraConfig from './jiraConfig';
import * as request from 'request-promise-native';
import Issue from '../../issue';
import User from '../../user';
import { IssueTimeTracking, WorkTimeConfig } from '../../issueTimeTracking';
import IIssuesProvider from '../issuesProvider';

export default class JiraIssuesProvider implements IIssuesProvider {

    private jiraConfig: JiraConfig;
    private authSession: any;
    private workTimeConfig: WorkTimeConfig;
    
    constructor (jiraConfig: JiraConfig){
        this.jiraConfig = jiraConfig;
        this.workTimeConfig = new WorkTimeConfig(jiraConfig.workDaysInWeek, jiraConfig.workHoursInDay);
    }

    getWorkTimeConfig(): WorkTimeConfig {
        return this.workTimeConfig;
    }

    public async getIssue (issueKey: string): Promise<Issue> {
        try {          
            let options = this.buildRequestOptions(`/rest/api/2/issue/${issueKey}`);
            let issue = await request(options);
            return issue;
        } catch(err) {
            throw err.error;
        }
    }

    public async getPlannedIssues(){
        return this.searchIssues(`filter="${this.jiraConfig.plannedIssuesFilterName}"`);
    }

    private async searchIssues (jql: string): Promise<Issue[]> {
        try {
            let options = this.buildRequestOptions(`/rest/api/2/search?jql=${encodeURIComponent(jql)}`);
            let issues = await request(options);
            return issues.issues.map((issue: any) => {
                let f = issue.fields;
                
                return new Issue(`${this.jiraConfig.url}/browse/${issue.key}`, issue.key, f.summary, 
                    new User(f.creator.key, f.creator.displayName),
                    new User(f.assignee.key, f.assignee.displayName), 
                    f.issuetype.name, f.status.name,
                    new IssueTimeTracking(f.timeoriginalestimate, f.timespent)
                );
            });
        } catch(err) {
            throw err.error;
        }
    }

    private buildRequestOptions(relativeUrlWithQueryString: string){
        
        //let session = await this.getAuthenticationCookieSession();

        let options = {
            uri: this.buildRequestUrl(relativeUrlWithQueryString),
            headers: {
                //'cookie': `${session.name}=${session.value}`
                'Authorization': this.buildBasicAuthorizationHeaderValue()
            },
            json: true
        }
        return options;
    }

    private async getAuthenticationCookieSession(){
        try {
            if(this.authSession){
                return this.authSession;
            }

            let options = {
                method: 'POST',
                uri: this.buildRequestUrl('/rest/auth/1/session'),
                json: true,
                body: {
                    username: this.jiraConfig.username,
                    password: this.jiraConfig.password
                }
            }
            const response = await request(options);
            console.log(response);
            this.authSession = response.session;
            return response.session;
        } catch(err) {
            throw err.error;
        }
    }

    private buildBasicAuthorizationHeaderValue(): string {
        const value = `${this.jiraConfig.username}:${this.jiraConfig.password}`;
        return 'Basic ' + new Buffer(value).toString('base64');
    }

    private buildRequestUrl(relativeUrl: string): string {
        return `${this.jiraConfig.url}${relativeUrl}`;
    }

}
