import express, { Request, Response, NextFunction } from 'express';
import {APILogger} from "./logger/api.logger";
import {TaskController} from "./controllers/task.controller";
import taskRoutes from "./routes/task.routes";
import 'dotenv/config'

class App {
    public express: express.Application;
    public logger: APILogger;
    public taskController: TaskController;


    constructor() {
        this.express = express();
        this.taskController = new TaskController();
        this.logger = new APILogger();
        this.registerRoutes();
        this.registerErrorHandlingMiddleware();
        this.registerBodyParsingMiddleware();
        this.registerCorsMiddleware();
    }

    private registerRoutes() {
        this.express.use('/v1/todo', taskRoutes);
        // Add more route files if needed
    }

    private registerErrorHandlingMiddleware() {
        this.express.use((err: any, req: Request, res: Response, next: NextFunction) => {
            // Handle the error and send an appropriate response
            res.status(500).json({ error: 'Internal Server Error' });
        });
    }

    //Body parsing middleware
    private registerBodyParsingMiddleware() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
    }

    /**
     * Cors middleware. This allows application to respond to request from different origins
     * @private
     */
    private registerCorsMiddleware() {
        this.express.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }
}

export default new App().express;