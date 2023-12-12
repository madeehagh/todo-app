import { Request, Response } from 'express';
import { TaskController } from '../../../src/controllers/task.controller';
import { TaskRepository } from '../../../src/repository/task.repository';
import { ErrorMessages } from '../../../src/constants/error.messages';
import { taskRequestData, taskResponseData } from "../../helper/TestInput";

describe('TaskController', () => {
    let taskController: TaskController;
    let taskRepository: TaskRepository;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        taskRepository = new TaskRepository();
        taskController = new TaskController();
        req = {} as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
    });

    describe('createTask', () => {
        it('should create a task and return the created task', async () => {


            jest.spyOn(taskRepository, 'createTask').mockImplementation(async (task) => {
                return taskResponseData;
            });
            req.body = taskRequestData;

            await taskController.createTask(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should handle errors and return 500 status', async () => {
            const errorMessage = ErrorMessages.APPLICATION_ERROR;
            jest.spyOn(taskRepository, 'createTask').mockRejectedValue(new Error(errorMessage));
            req.body = taskRequestData;

            await taskController.createTask(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
});