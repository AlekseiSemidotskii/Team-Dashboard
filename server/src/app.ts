import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes';

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

    let router = express.Router();
    
    Routes.register(router);

    this.express.use('/api', router);
  }

}

export default new App().express;