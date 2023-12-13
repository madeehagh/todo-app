import express, { Request, Response, NextFunction, Application } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import { APILogger } from './logger/api.logger';
import taskRoutes from './routes/task.routes';
import userRoutes from './routes/user.routes';
import {authorizationMiddleware} from "./middlewares/authorization.middleware";
import { loggingMiddleware } from './middlewares/logging.middleware';
import { corsMiddleware } from './middlewares/cors.middleware';

class App {
    public app: Application;
    private logger: APILogger;

    constructor() {
        this.app = express();
        this.logger = new APILogger();
        this.configureMiddleware();
        this.registerRoutes();
        this.registerErrorHandlingMiddleware();
    }

    private configureMiddleware() {
        this.app.use(corsMiddleware);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(authorizationMiddleware);
        this.app.use(loggingMiddleware);
    }

    private registerRoutes() {
        this.app.use('/v1/todo', taskRoutes);
        this.app.use('/v1/todo/user', userRoutes);
    }

    private registerErrorHandlingMiddleware() {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            this.logger.error(err.message, err);
            res.status(500).json({ error: 'Internal Server Error' });
            next(err);
        });
    }
}

export default new App().app;