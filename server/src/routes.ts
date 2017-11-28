import { Router } from "express";
import config from './config/web'

import JiraIssuesProvider from './issues/providers/jira/jiraIssuesProvider';
import IssuesRouter from './issues/issuesRouter';

export default class Routes {
    public static register (router: Router): void {

        const jiraIssuesProvider = new JiraIssuesProvider(config.appConfig.jiraIssuesProviderConfig);
        
        IssuesRouter.register(router, jiraIssuesProvider);

    }
}