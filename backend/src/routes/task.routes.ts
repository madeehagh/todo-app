import "reflect-metadata";
import express, { Request, Response, Router } from 'express';

import { TaskController } from "../controllers/task.controller";

const router: Router = express.Router();
const taskController = new TaskController();

type Route = {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    handler: (req: Request, res: Response) => Promise<void>; // Update the handler type to return a Promise<void>
};

const taskRoutes: Route[] = [
    { method: 'get', path: '/tasks', handler: taskController.getAllTasks.bind(taskController) },
    { method: 'get', path: '/tasks/:id', handler: taskController.getTaskById.bind(taskController) },
    { method: 'post', path: '/tasks', handler: taskController.createTask.bind(taskController) },
    { method: 'put', path: '/tasks/:id', handler: taskController.updateTask.bind(taskController) },
    { method: 'delete', path: '/tasks/:id', handler: taskController.deleteTask.bind(taskController) },
];

taskRoutes.forEach((route: Route) => {
    const { method, path, handler } = route;
    router[method](path, handler);
});

export default router;