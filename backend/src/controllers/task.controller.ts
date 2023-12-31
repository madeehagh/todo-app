import { Request, Response } from 'express';
import { Task } from '@prisma/client';
import { APILogger } from '../logger/api.logger';
import { TaskRepository } from '../repository/task.repository';
import { ErrorMessages } from '../constants/error.messages';
import { ApiResponse } from '../response/api.response';
import { validationResult, body } from 'express-validator';
import {DatabaseError} from "../error/database.error";

/**
 * @class TaskController
 * @classdesc Controller for managing tasks
 */
export class TaskController {
    private logger: APILogger;
    private taskRepository: TaskRepository;

    constructor() {
        this.logger = new APILogger();
        this.taskRepository = new TaskRepository();
    }

    /**
     * @api {get} /tasks Get all tasks
     * @apiName GetAllTasks
     * @apiGroup Task
     *
     * @apiSuccess {Object[]} tasks List of tasks
     * @apiExample {curl} Example usage:
     *     curl -X GET -H "Content-Type: application/json"  http://localhost:4000/v1/todo/tasks
     */
    getAllTasks = async (req: Request, res: Response): Promise<void> => {
        try {
            const tasks: Task[] = await this.taskRepository.getAllTasks();
            const apiResponse = new ApiResponse(res);
            apiResponse.success(tasks);
        } catch (error: any) {
            if (error instanceof DatabaseError) {
                this.handleDatabaseError(res, error);
            } else {
                this.handleError(res,ErrorMessages.APPLICATION_GENERIC_ERROR,  error);
            }
        }
    };

    /**
     * @api {get} /tasks/:id Get task by ID
     * @apiName GetTaskById
     * @apiGroup Task
     *
     * @apiParam {String} id Task ID
     *
     * @apiSuccess {Object} task Task object
     *
     * @apiError {String} message Error message
     * @apiExample {curl} Example usage:
     * curl -X GET -H "Content-Type: application/json"  http://localhost:4000/v1/todo/tasks/`some-task-id`
     */
    getTaskById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params as { id: string };

        try {
            const task: Task | null = await this.taskRepository.getTaskById(id);
            const apiResponse = new ApiResponse(res);
            if (task) {
                apiResponse.success(task);
            } else {
                this.logger.warn(ErrorMessages.RECORD_NOT_FOUND, id);
                apiResponse.error(ErrorMessages.RECORD_NOT_FOUND, 404);
            }
        } catch (error: any) {
            if (error instanceof DatabaseError) {
                this.handleDatabaseError(res, error);
            } else {
                this.handleError(res,ErrorMessages.APPLICATION_GENERIC_ERROR,  error);
            }
        }
    };

    /**
     * @api {post} /tasks Create a new task
     * @apiName CreateTask
     * @apiGroup Task
     *
     * @apiBody {Object} task Task Object
     *
     * @apiSuccess {Object} newTask Newly created task
     * @apiSuccess {Object[]} allTasks List of all tasks
     *
     * @apiError {String} message Error message
     */
    createTask = async (req: Request, res: Response): Promise<void> => {
        const task: Task = req.body;
        const apiResponse = new ApiResponse(res);

        try {
            const existingTask: Task | null = await this.taskRepository.getTaskByName(task.name);
            if (existingTask) {
                apiResponse.error('Task name must be unique to the user', 400);
                return;
            }
            const newTaskAdded: Task = await this.taskRepository.createTask(task);
            const allTasks: Task[] = await this.taskRepository.getAllTasks();
            apiResponse.success({ newTask: newTaskAdded, allTasks: allTasks });
        } catch (error) {
            if (error instanceof DatabaseError) {
                this.handleDatabaseError(res, error);
            } else {
                this.handleError(res,ErrorMessages.APPLICATION_GENERIC_ERROR,  error);
            }
        }
    };

    /**
     * @api {put} /tasks/:id Update a task
     * @apiName UpdateTask
     * @apiGroup Task
     *
     * @apiParam {String} id Task ID
     * @apiBody {Object} Task

     * @apiSuccess {Object} taskUpdated Updated task
     *
     * @apiError {String} message Error message
     */
    updateTask = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params as { id: string };
        const updatedTask: Task = req.body as Task;
        const userId: string = updatedTask.userId;

        try {
            const taskUpdated: Task | null = await this.taskRepository.updateTask(id, userId, updatedTask);
            const apiResponse = new ApiResponse(res);
            if (taskUpdated) {
                apiResponse.success(taskUpdated);
            } else {
                apiResponse.error(ErrorMessages.RECORD_NOT_FOUND, 404);
            }
        } catch (error: any) {
            if (error instanceof DatabaseError) {
                this.handleDatabaseError(res, error);
            } else {
                this.handleError(res,ErrorMessages.APPLICATION_GENERIC_ERROR,  error);
            }
        }
    };

    /**
     * @api {delete} /tasks/:id Delete a task
     * @apiName DeleteTask
     * @apiGroup Task
     *
     * @apiParam {String} id Task ID
     *
     * @apiSuccess {String} message Success message
     *
     * @apiError {String} message Error message
     */
    deleteTask = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params as { id: string };

        try {
            await this.taskRepository.deleteTask(id);
            const apiResponse = new ApiResponse(res);
            apiResponse.success();
        } catch (error: any) {
            if (error instanceof DatabaseError) {
                this.handleDatabaseError(res, error);
            } else {
                this.handleError(res,ErrorMessages.APPLICATION_GENERIC_ERROR,  error);
            }
        }
    };

    private handleError(res: Response, errorMessage: string,  error: any): void {
        this.logger.error(errorMessage, error);
        const apiResponse = new ApiResponse(res);
        apiResponse.error(errorMessage, 500);
    }

    private handleDatabaseError(res: Response, error: DatabaseError): void {
        const apiResponse = new ApiResponse(res);
        apiResponse.error(ErrorMessages.APPLICATION_GENERIC_ERROR, 500);
    }

    private validateInput(req: Request, res: Response, next: () => void): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            const apiResponse = new ApiResponse(res);
            apiResponse.error('Validation Error', 400);
        } else {
            next();
        }
    }
}