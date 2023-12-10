import { Request, Response } from 'express';
import { PrismaClient, Task} from "@prisma/client";
import {APILogger} from '../logger/api.logger';

export class TaskController {
    private logger: APILogger;
    private taskClient;
    constructor() {
        this.logger = new APILogger();
        this.taskClient = new PrismaClient().task;
    }

    // Get all tasks
    getAllTasks = async (req: Request, res: Response): Promise<void> => {
        try {
            const tasks: Task[] = await this.taskClient.findMany();
            res.status(200).json({ data: tasks });
        } catch (error) {
            this.logger.error('Error while getting all tasks', error);
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    // Get a task by ID
    getTaskById = async (req: Request, res: Response) => {
        const taskId: number = parseInt(req.params.id);

        try {
            const task: Task[] = await this.taskClient.findUnique({ where: { id: taskId }});
            res.status(200).json({ data: task });
        } catch (error) {
            this.logger.error('Error while getting task by ID', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    // Create a new task
    createTask = async (req: Request, res: Response) => {
        const task: Task = req.body;
        try {
            await this.taskClient.create({
                data: { ...task },
            });
            res.status(201).json({data: task});
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
            const taskUpdated = await this.taskClient.update({
                where: { id: taskId },
                data: { ...updatedTask },
            });
            res.status(200).json({ data: taskUpdated });
        } catch (error) {
            this.logger.error('Error while updating a task', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    // Delete a task
    deleteTask = async (req: Request, res: Response) => {
        const taskId: number = parseInt(req.params.id);

        try {
             await this.taskClient.delete(
            { where: { id: taskId }});

            res.status(200).json({ data: {} });

        } catch (error) {
            this.logger.error('Error while deleting a task', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}