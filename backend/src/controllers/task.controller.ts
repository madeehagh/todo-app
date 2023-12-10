import { Request, Response } from 'express';
import { Task } from '../models/task';
import { TaskService } from '../service/TaskService';
import { APILogger } from '../logger/api.logger';
import {plainToInstance} from "class-transformer";

export class TaskController {
    private taskService: TaskService;
    private logger: APILogger;

    constructor() {
        this.taskService = new TaskService();
        this.logger = new APILogger();
    }

    // Get all tasks
    getAllTasks = async (req: Request, res: Response) => {
        try {
            const tasks: Task[] = await this.taskService.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            this.logger.error('Error while getting all tasks', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    // Get a task by ID
    getTaskById = async (req: Request, res: Response) => {
        const taskId: number = parseInt(req.params.id);

        try {
            const task: Task | undefined = await this.taskService.getTaskById(taskId);

            if (task) {
                res.status(200).json(task);
            } else {
                this.logger.warn('Task not found');
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            this.logger.error('Error while getting task by ID', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    // Create a new task
    createTask = async (req: Request, res: Response) => {
        const requestBody: Task = req.body;
        const task = plainToInstance(Task, requestBody);

        try {
            await this.taskService.saveTask(task);
            res.status(201).json(task);
        } catch (error) {
            this.logger.error('Error while creating a task', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    // Update a task
    updateTask = async (req: Request, res: Response) => {
        const taskId: number = parseInt(req.params.id);
        const updatedTask: Task = req.body;

        try {
            const task: Task | undefined = await this.taskService.getTaskById(taskId);

            if (task) {
                updatedTask.id = taskId;
                const updatedTaskResult: Task = await this.taskService.updateTask(updatedTask);
                res.status(200).json(updatedTaskResult);
            } else {
                this.logger.warn('Task not found');
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            this.logger.error('Error while updating a task', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    // Delete a task
    deleteTask = async (req: Request, res: Response) => {
        const taskId: number = parseInt(req.params.id);

        try {
            const task: Task | undefined = await this.taskService.getTaskById(taskId);

            if (task) {
                await this.taskService.deleteTask(taskId);
                res.status(204).end();
            } else {
                this.logger.warn('Task not found');
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            this.logger.error('Error while deleting a task', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}