const fs = require('fs');
const path = require('path');

const JiraIssuesProvider = require('./jiraIssuesProvider');
const TempoWorklogProvider = require('./tempoWorklogProvider');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, `config.json`)).toString());

const provider = new JiraIssuesProvider(config);
const worklogProvider = new TempoWorklogProvider(config.url, config.tempoApiToken);

// top level await is not supported.
(async () => {
 
    const worklogs = await worklogProvider.getWorklog('2018-02-01', '2018-02-28');
    
    const users = ['meshkov', 'ivanov', 'johnlu', 'joe'];

    const issues = {};

    const aggregatedWorklog = worklogs.reduce( (r, v) => {
        if(!users.includes(v.userName)) {
            return r;
        }
        if(!issues[v.issueKey]){
            issues[v.issueKey] = { summary: v.issueSummary };
        }

        const key = v.userName + '/' + v.issueKey;
        r[key] = r[key] || { hours: 0};
        r[key].hours += v.hours;

        return r;
    }, Object.create(null));

    for(let k in issues) {
        let issue = await provider.getIssue(k);
        issues[k].assignee = issue.assignee;
        issues[k].timeTracking = issue.issueTimeTracking;
    }

    for(let k in aggregatedWorklog) {
        const keys = k.split('/');
        const issueKey = keys[1];
        const userName = keys[0];
        const issue = issues[issueKey];

        var log = {
            issueKey: issueKey,
            issueSummary: issue.summary,
            worklogUser: userName,
            assignee: issue.assignee.key,
            originalEstimate: (issue.timeTracking.originalEstimate / 3600).toFixed(2), 
            timespent: (aggregatedWorklog[k].hours).toFixed(2)
        }
        console.log(`${log.issueKey};${log.issueSummary};${log.worklogUser};${log.assignee};${log.originalEstimate};${log.timespent};`);
    }

    //console.log(aggregatedWorklog);
    //console.log(issues);

})();
