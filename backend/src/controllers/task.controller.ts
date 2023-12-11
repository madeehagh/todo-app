import { Request, Response } from 'express';
import { Task } from '@prisma/client';
import { APILogger } from '../logger/api.logger';
import { TaskRepository } from '../repository/task.repository';
import {ErrorMessages} from "../constants/error.messages";

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
            this.logger.error(ErrorMessages.APPLICATION_ERROR, error);
            res.status(500).json({ error: ErrorMessages.APPLICATION_ERROR });
        }
    };

    getTaskById = async (req: Request, res: Response): Promise<void> => {
        const taskId: number = parseInt(req.params.id);

        try {
            const task: Task | null = await this.taskRepository.getTaskById(taskId);
            if (task) {
                res.status(200).json({ data: task });
            } else {
                this.logger.warn(ErrorMessages.RECORD_NOT_FOUND, taskId);
                res.status(404).json({ error: ErrorMessages.RECORD_NOT_FOUND });
            }
        } catch (error) {
            this.logger.error(ErrorMessages.APPLICATION_ERROR, error);
            res.status(500).json({ error: ErrorMessages.APPLICATION_ERROR });
        }
    };

    createTask = async (req: Request, res: Response): Promise<void> => {
        const task: Task = req.body;
        try {
            const createdTask: Task = await this.taskRepository.createTask(task);
            res.status(201).json({ data: createdTask });
        } catch (error) {
            this.logger.error(ErrorMessages.APPLICATION_ERROR, error);
            res.status(500).json({ error: ErrorMessages.APPLICATION_ERROR });
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
            this.logger.error(ErrorMessages.APPLICATION_ERROR, error);
            res.status(500).json({ error: ErrorMessages.APPLICATION_ERROR });
        }
    };

    deleteTask = async (req: Request, res: Response): Promise<void> => {
        const taskId: number = parseInt(req.params.id);

        try {
            await this.taskRepository.deleteTask(taskId);
            res.status(200).json({ data: {} });
        } catch (error) {
            this.logger.error('Error while deleting a task', error);
            res.status(500).json({ error: ErrorMessages.APPLICATION_ERROR });
        }
    };
}