const request = require('request-promise-native');
const parseString = require('xml2js').parseString;
const Worklog = require('./worklog');

class TempoWorklogProvider {
    constructor(jiraUrl, apiToken) {
        this.jiraUrl = jiraUrl;
        this.apiToken = apiToken;
    }

    async getWorklog(dateFrom, dateTo) {

        const requestUrl = `${this.jiraUrl}/plugins/servlet/tempo-getWorklog/?tempoApiToken=${this.apiToken}&dateFrom=${dateFrom}&dateTo=${dateTo}&format=xml&diffOnly=false&addParentIssue=true&addIssueSummary=true&addUserDetails=true`;

        let worklogXml = await request(requestUrl);
        const promise = new Promise( (resolve, reject) => {
            parseString(worklogXml, function (err, result) {
                resolve(result.worklogs.worklog.map(v => {
                    return new Worklog(
                        v.worklog_id[0], 
                        v.work_date[0], 
                        v.issue_key[0], 
                        v.issue_summary[0], 
                        v.parent_key ? v.parent_key[0] : null,
                        v.username[0],
                        v.user_details[0].full_name[0],
                        +v.hours[0]);
                }));
            });
        });

        return promise;
    }
}

module.exports = TempoWorklogProvider;