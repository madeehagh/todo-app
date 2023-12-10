import express, { Request, Response, Router } from 'express';
import { plainToInstance } from 'class-transformer';

import { TaskController } from "../controllers/task.controller";
import { Task } from "../models/task";

const router: Router = express.Router();
const taskController = new TaskController();

type Route = {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    handler: (req: Request, res: Response) => Promise<void>; // Update the handler type to return a Promise<void>
};

const taskRoutes: Route[] = [
    { method: 'get', path: '/tasks', handler: taskController.getAllTasks.bind(taskController) }, // Update the handler to use getAllTasks method
    {
        method: 'post', path: '/tasks', handler: async (req: Request, res: Response) => {
            const requestBody = req.body;
            const task = plainToInstance(Task, requestBody);
            try {
                await taskController.createTask(req, res); // Await the createTask method
                console.log('routed ', task)
                res.status(201).json(task);
            } catch (error) {
                console.log('routed ', '500')
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    },
];

taskRoutes.forEach((route: Route) => {
    const { method, path, handler } = route;
    router[method](path, handler);
});

export default router;