import { Router } from 'express';
import JiraIssuesProvider from './providers/jira/jiraIssuesProvider';
import IIssuesProvider from './providers/issuesProvider';

export default class IssuesRouter {
    
    public static register(router: Router, issuesProvider: IIssuesProvider): void {

        router.get('/issue/:issueKey?', async (req, res, next) => {
            try {
                const issueKey = req.params.issueKey;
                let issue = await issuesProvider.getIssue(issueKey);
                res.json(issue);
            } catch (error) {
                res.json({
                    message: error
                });
            }
        });
    
        router.get('/issues/planned', async (req, res, next) => {
            try {
                let issues = await issuesProvider.getPlannedIssues();
                res.json(issues);
            } catch (error) {
                res.json({
                    message: error
                });
            }
        });
    }
}