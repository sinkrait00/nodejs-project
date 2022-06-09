import express, { Express } from 'express';
import {Server} from 'http';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
export class App{
  app: Express
  port: number;
  server: Server | undefined;
  logger: LoggerService;
  userController: UserController;
  
  constructor(logger: LoggerService,
    userController: UserController,
    ){
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
  }

  useRoutes(){
    this.app.use('/users', this.userController.router);
  }

  public async init(){
    this.useRoutes()
    this.server = this.app.listen(this.port);
    this.logger.info(`Server started on port ${this.port}`);
  }
}