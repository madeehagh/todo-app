import express, {Request, Response, NextFunction, Application} from 'express';
import bodyParser from "body-parser";

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
        this.registerBodyParsingMiddleware();
        this.registerRoutes();
        this.registerErrorHandlingMiddleware();
        this.registerCorsMiddleware();
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

    /**
     * Cors middleware. This allows application to respond to request from different origins
     * @private
     */
    private registerCorsMiddleware(req?: Request, res?: Response, next?: NextFunction) {
        res?.setHeader('Access-Control-Allow-Origin', '*');
        res?.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res?.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next?.();
    }
}

export default new App().app;