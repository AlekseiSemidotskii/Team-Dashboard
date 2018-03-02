const request = require('request-promise-native');

class JiraIssuesProvider {
    constructor(config){
        this.jiraConfig = config;
        this.authSession = null;
    }

    async searchIssues (jql) {
        try {
            let options = this.buildRequestOptions(`/rest/api/2/search?jql=${encodeURIComponent(jql)}`);
            let result = await request(options);
            return result.issues.map((issue) => {
                return this.buildIssueInfo(issue);
            });
        } catch(err) {
            throw err.error;
        }
    }

    async getIssue (issueKey) {
        try {          
            let options = this.buildRequestOptions(`/rest/api/2/issue/${issueKey}`);
            let issue = await request(options);
            return this.buildIssueInfo(issue);
        } catch(err) {
            throw err.error;
        }
    }

    buildIssueInfo (issue) {
        const f = issue.fields;
                
        return {
            url: `${this.jiraConfig.url}/browse/${issue.key}`, 
            key: issue.key, 
            summary: f.summary, 
            businessProduct: f.customfield_10622 && f.customfield_10622.value || '',
            creator: {
                key: f.creator.key, 
                name: f.creator.displayName
            },
            assignee: {
                key: f.assignee.key, 
                name: f.assignee.displayName
            }, 
            issuetype: f.issuetype.name, 
            status: f.status.name,
            issueTimeTracking : { 
                originalEstimate: f.timeoriginalestimate, 
                timespent: f.timespent
            }
        };
    }

    buildRequestOptions(relativeUrlWithQueryString) {
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

    async getAuthenticationCookieSession() {
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

    buildBasicAuthorizationHeaderValue() {
        const value = `${this.jiraConfig.username}:${this.jiraConfig.password}`;
        return 'Basic ' + new Buffer(value).toString('base64');
    }

    buildRequestUrl(relativeUrl) {
        return `${this.jiraConfig.url}${relativeUrl}`;
    }
}

module.exports = JiraIssuesProvider;