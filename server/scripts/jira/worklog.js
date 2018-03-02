class Worklog {
    constructor(id, date, issueKey, issueSummary, parentIssueKey, userName, userFullName, hours) {
        this.id = id;
        this.date = date;
        this.issueKey = issueKey;
        this.issueSummary = issueSummary;
        this.parentIssueKey = parentIssueKey;
        this.userName = userName;
        this.userFullName = userFullName;
        this.hours = hours;
    }
}

module.exports = Worklog;