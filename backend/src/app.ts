import express from 'express';
import {APILogger} from "./logger/ApiLogger";
import {TaskController} from "./controllers/TaskController";




class App {
    public express: express.Application;
    public logger: APILogger;
    public taskController: TaskController;


    constructor() {
        this.express = express();
        this.taskController = new TaskController();
        this.logger = new APILogger();
    }
}

export default new App().express;