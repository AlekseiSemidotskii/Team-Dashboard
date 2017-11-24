import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import config from './config/web'
import JiraIssuesProvider from './issues/providers/jira/jiraIssuesProvider';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {

    //this.express.use('/node_modules', express.static('./node_modules'));
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(express.static(path.join(__dirname, '../../client')));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });

    const jiraIssuesProvider = new JiraIssuesProvider(config.appConfig.jiraIssuesProviderConfig);

    router.get('/issue/:issueKey?', async (req, res, next) => {
      try {
        const issueKey = req.params.issueKey;
        let issue = await jiraIssuesProvider.getIssue(issueKey);
        res.json(issue);
      } catch (error) {
        res.json({
          message: error
        });
      }
    });

    router.get('/issues/planned', async (req, res, next) => {
      try {
        let issues = await jiraIssuesProvider.getPlannedIssues();
        res.json(issues);
      } catch (error) {
        res.json({
          message: error
        });
      }
    });

    this.express.use('/api', router);
  }

}

export default new App().express;