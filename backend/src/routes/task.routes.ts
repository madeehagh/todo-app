import express, { Request, Response, Router } from 'express';
import {TaskController} from "../controllers/task.controller";

const router: Router = express.Router();
const taskController = new TaskController();

type Route = {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    handler: (req: Request, res: Response) => void;
};

const taskRoutes: Route[] = [
    { method: 'get', path: '/tasks', handler: taskController.getTasks },
  //  { method: 'get', path: '/tasks/:id', handler: getTaskById },
    { method: 'post', path: '/tasks', handler: taskController.createTask },
   // { method: 'put', path: '/tasks/:id', handler: updateTask },
    //{ method: 'delete', path: '/tasks/:id', handler: deleteTask },
];

taskRoutes.forEach((route: Route) => {
    const { method, path, handler } = route;
    router[method](path, handler);
});

export default router;