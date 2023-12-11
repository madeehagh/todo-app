import { Request, Response } from 'express';
import { Task } from '@prisma/client';
import { APILogger } from '../logger/api.logger';
import { TaskRepository } from '../repository/task.repository';

export class TaskController {
    private logger: APILogger;
    private taskRepository: TaskRepository;

    constructor() {
        this.logger = new APILogger();
        this.taskRepository = new TaskRepository();
    }

    getAllTasks = async (req: Request, res: Response): Promise<void> => {
        try {
            const tasks: Task[] = await this.taskRepository.getAllTasks();
            res.status(200).json({ data: tasks });
        } catch (error) {
            this.logger.error('Error while getting all tasks', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    getTaskById = async (req: Request, res: Response): Promise<void> => {
        const taskId: number = parseInt(req.params.id);

        try {
            const task: Task | null = await this.taskRepository.getTaskById(taskId);
            if (task) {
                res.status(200).json({ data: task });
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            this.logger.error('Error while getting task by ID', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    createTask = async (req: Request, res: Response): Promise<void> => {
        const task: Task = req.body;
        try {
            const createdTask: Task = await this.taskRepository.createTask(task);
            res.status(201).json({ data: createdTask });
        } catch (error) {
            this.logger.error('Error while creating a task', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    updateTask = async (req: Request, res: Response): Promise<void> => {
        const taskId: number = parseInt(req.params.id);
        const updatedTask: Task = req.body;

        try {
            const taskUpdated: Task | null = await this.taskRepository.updateTask(
                taskId,
                updatedTask
            );
            if (taskUpdated) {
                res.status(200).json({ data: taskUpdated });
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            this.logger.error('Error while updating a task', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    deleteTask = async (req: Request, res: Response): Promise<void> => {
        const taskId: number = parseInt(req.params.id);

        try {
            await this.taskRepository.deleteTask(taskId);
            res.status(200).json({ data: {} });
        } catch (error) {
            this.logger.error('Error while deleting a task', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}