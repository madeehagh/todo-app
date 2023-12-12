import express, { Request, Response, NextFunction, Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import { APILogger } from './logger/api.logger';
import { TaskController } from './controllers/task.controller';
import taskRoutes from './routes/task.routes';
import userRoutes from './routes/user.routes';

class App {
    public app: Application;
    private logger: APILogger;
    private taskController: TaskController;

    constructor() {
        this.app = express();
        this.logger = new APILogger();
        this.taskController = new TaskController();

        this.configureMiddleware();
        this.registerRoutes();
        this.registerErrorHandlingMiddleware();
    }

    private configureMiddleware() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(this.authorizationMiddleware);
    }

    private authorizationMiddleware(req: Request, res: Response, next: NextFunction) {
        const apiKey = req.get('x-api-key');
        if (!apiKey || apiKey !== process.env.API_KEY) {
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            next();
        }
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