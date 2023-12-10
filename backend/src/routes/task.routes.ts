import express, { Request, Response, Router } from 'express';

import { TaskController } from "../controllers/task.controller";
import { Task } from "../models/task";
import {plainToClass, plainToInstance} from 'class-transformer';

const router: Router = express.Router();
const taskController = new TaskController();

type Route = {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    handler: (req: Request, res: Response) => void;
};

const taskRoutes: Route[] = [
    { method: 'get', path: '/tasks', handler: taskController.getTasks },
    {
        method: 'post', path: '/tasks', handler: (req: Request, res: Response) => {
            const requestBody = req.body;
            const task = plainToInstance(Task, requestBody);
            taskController.createTask(task)
                .then((createdTask: Task) => {
                    console.log('routed ', createdTask)
                    res.status(201).json(createdTask);
                })
                .catch(() => {
                    console.log('routed ', '500')

                    res.status(500).json({ error: 'Internal Server Error' });
                });
        }
    },
];

taskRoutes.forEach((route: Route) => {
    const { method, path, handler } = route;
    router[method](path, handler);
});

export default router;