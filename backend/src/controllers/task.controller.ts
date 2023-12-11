import { Request, Response } from 'express';
import { Task } from '@prisma/client';
import { APILogger } from '../logger/api.logger';
import { TaskRepository } from '../repository/task.repository';
import { ErrorMessages } from '../constants/error.messages';

export class TaskController {
    private logger: APILogger;
    private taskRepository: TaskRepository;

    constructor() {
        this.logger = new APILogger();
        this.taskRepository = new TaskRepository();
    }

    /**
     * @api {get} /tasks/ Get all tasks
     * @apiName GetAllTasks
     * @apiGroup Task
     *
     * @apiSuccess {Task[]} tasks Array of tasks.
     */
    getAllTasks = async (req: Request, res: Response): Promise<void> => {
        try {
            const tasks: Task[] = await this.taskRepository.getAllTasks();
            res.status(200).json({ data: tasks });
        } catch (error) {
            this.logger.error(ErrorMessages.APPLICATION_ERROR, error);
            res.status(500).json({ error: ErrorMessages.APPLICATION_ERROR });
        }
    };

    /**
     * @api {get} /tasks/:id Get task by ID
     * @apiName GetTaskById
     * @apiGroup Task
     *
     * @apiParam {String} id Task ID.
     *
     * @apiSuccess {Task} task Task object.
     * @apiError (404) {String} error Task not found.
     */
    getTaskById = async (req: Request, res: Response): Promise<void> => {
        const taskId: string = req.params.id;

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

    /**
     * @api {post} /tasks/ Create a new task
     * @apiName CreateTask
     * @apiGroup Task
     *
     * @apiBody {Task} task Task object.
     *
     * @apiSuccess {Task} newTask Newly created task object.
     * @apiSuccess {Task[]} allTasks Array of all tasks.
     */
    createTask = async (req: Request, res: Response): Promise<void> => {
        const task: Task = req.body;
        try {
            const newTaskAdded: Task = await this.taskRepository.createTask(task);
            const allTasks: Task[] = await this.taskRepository.getAllTasks();

            res.status(201).json({ data: { newTask: newTaskAdded, allTasks: allTasks } });
        } catch (error) {
            this.logger.error(ErrorMessages.APPLICATION_ERROR, error);
            res.status(500).json({ error: ErrorMessages.APPLICATION_ERROR });
        }
    };

    /**
     * @api {put} /tasks/:id Update a task
     * @apiName UpdateTask
     * @apiGroup Task
     *
     * @apiParam {String} id Task ID.
     * @apiParam {Task} task Updated task object.
     *
     * @apiSuccess {Task} taskUpdated Updated task object.
     * @apiError (404) {String} error Task not found.
     */
    updateTask = async (req: Request, res: Response): Promise<void> => {
        const taskId: string = req.params.id;
        const updatedTask: Task = req.body;

        try {
            const taskUpdated: Task | null = await this.taskRepository.updateTask(taskId, updatedTask);
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

    /**
     * @api {delete} /tasks/:id Delete a task
     * @apiName DeleteTask
     * @apiGroup Task
     *
     * @apiParam {String} id Task ID.
     *
     * @apiSuccess {Object} data Empty object.
     * @apiError (500) {String} error Application error message.
     */
    deleteTask = async (req: Request, res: Response): Promise<void> => {
        const taskId: string = req.params.id;

        try {
            await this.taskRepository.deleteTask(taskId);
            res.status(200).json({ data: {} });
        } catch (error) {
            this.logger.error('Error while deleting a task', error);
            res.status(500).json({ error: ErrorMessages.APPLICATION_ERROR });
        }
    };
}