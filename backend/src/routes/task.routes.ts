import { Router, Request, Response } from 'express';
import { TaskController } from '../controllers/task.controller';

const router: Router = Router();
const taskController = new TaskController();

type Route = {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    handler: (req: Request, res: Response) => Promise<void>;
};

const taskRoutes: Route[] = [
    { method: 'get', path: '/tasks', handler: taskController.getAllTasks },
    { method: 'get', path: '/tasks/:id', handler: taskController.getTaskById },
    { method: 'post', path: '/tasks', handler: taskController.createTask as unknown as (req: Request, res: Response) => Promise<void> },
    { method: 'put', path: '/tasks/:id', handler: taskController.updateTask },
    { method: 'delete', path: '/tasks/:id', handler: taskController.deleteTask },
];

taskRoutes.forEach(({ method, path, handler }: Route) => {
    router[method](path, handler);
});

export default router;