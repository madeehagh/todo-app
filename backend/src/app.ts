import express, {Request, Response, NextFunction, Application} from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

import {APILogger} from "./logger/api.logger";
import {TaskController} from "./controllers/task.controller";
import taskRoutes from "./routes/task.routes";
import 'dotenv/config'

class App {
    public app: Application;
    public logger: APILogger;
    public taskController: TaskController;


    constructor() {
        this.app = express();
        this.taskController = new TaskController();
        this.logger = new APILogger();
        this.app.use(cors());
        this.registerBodyParsingMiddleware();
        this.registerRoutes();
        this.registerErrorHandlingMiddleware();
    }


    private registerRoutes() {
        this.app.use('/v1/todo', taskRoutes);
    }

    private registerErrorHandlingMiddleware() {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            this.logger.error(err.message, err);
            res.status(500).json({ error: 'Internal Server Error' });
            next(err);
        });
    }

    //Body parsing middleware
    private registerBodyParsingMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
}

export default new App().app;