import {PrismaClient, Task} from '@prisma/client';
import {TaskRepository} from '../../../src/repository/task.repository';
import {ErrorMessages} from "../../../src/constants/error.messages";
import {taskData} from "../../helper/TestInput";

// Mock the PrismaClient
jest.mock('@prisma/client', () => {
    const taskMock = {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    const prismaClientMock = {
        task: taskMock,
    };

    return {
        PrismaClient: jest.fn().mockImplementation(() => prismaClientMock),
    };
});

describe('TaskRepository', () => {
    let taskRepository: TaskRepository;
    let prismaClient: PrismaClient;

    beforeEach(() => {
        taskRepository = new TaskRepository();
        prismaClient = new PrismaClient();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTask', () => {
        it('should create a task and return the created task', async () => {
            jest.spyOn(prismaClient.task, 'create').mockResolvedValue(taskData);

            const createdTask = await taskRepository.createTask(taskData);

            expect(createdTask).toEqual(taskData);
            expect(prismaClient.task.create).toHaveBeenCalledTimes(1);
            expect(prismaClient.task.create).toHaveBeenCalledWith({data: taskData});
        });

        it('should throw an error if creating a task fails', async () => {
            const errorMessage = ErrorMessages.DB_CREATE_ERROR;

            jest.spyOn(prismaClient.task, 'create').mockRejectedValue(new Error(errorMessage));

            await expect(taskRepository.createTask(taskData)).rejects.toThrowError(errorMessage);
            expect(prismaClient.task.create).toHaveBeenCalledTimes(1);
            expect(prismaClient.task.create).toHaveBeenCalledWith({data: taskData});
        });
    });

    describe('updateTask', () => {
        it('should update a task and return the updated task', async () => {
            jest.spyOn(prismaClient.task, 'update').mockResolvedValue(taskData);

            const updatedTask = await taskRepository.updateTask(taskData["id"], taskData);

            expect(updatedTask).toEqual(taskData);
            expect(prismaClient.task.update).toHaveBeenCalledTimes(1);
            expect(prismaClient.task.update).toHaveBeenCalledWith({
                where: {id: taskData["id"]},
                data: taskData,
            });
        });

        it('should throw an error if updating a task fails', async () => {
            const errorMessage = ErrorMessages.DB_UPDATE_ERROR;

            jest.spyOn(prismaClient.task, 'update').mockRejectedValue(new Error(errorMessage));

            await expect(taskRepository.updateTask(taskData["id"], taskData)).rejects.toThrowError(errorMessage);
            expect(prismaClient.task.update).toHaveBeenCalledTimes(1);
            expect(prismaClient.task.update).toHaveBeenCalledWith({
                where: {id: taskData["id"]},
                data: taskData,
            });
        });
    });

    describe('getTaskById', () => {
        it('should return a task by ID', async () => {
            jest.spyOn(prismaClient.task, 'findUnique').mockResolvedValue(taskData);

            const task = await taskRepository.getTaskById(taskData["id"]);

            expect(task).toEqual(taskData);
            expect(prismaClient.task.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaClient.task.findUnique).toHaveBeenCalledWith({where: {id: taskData["id"]}});
        });

        it('should return null if task with ID does not exist', async () => {
            jest.spyOn(prismaClient.task, 'findUnique').mockResolvedValue(null);

            const task = await taskRepository.getTaskById(taskData["id"]);

            expect(task).toBeNull();
            expect(prismaClient.task.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaClient.task.findUnique).toHaveBeenCalledWith({where: {id: taskData["id"]}});
        });

        it('should throw an error if fetching a task by ID fails', async () => {
            const errorMessage = ErrorMessages.DB_FETCH_ERROR;

            jest.spyOn(prismaClient.task, 'findUnique').mockRejectedValue(new Error(errorMessage));

            await expect(taskRepository.getTaskById(taskData["id"])).rejects.toThrowError(errorMessage);
            expect(prismaClient.task.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaClient.task.findUnique).toHaveBeenCalledWith({where: {id: taskData["id"]}});
        });
    });

    describe('deleteTask', () => {
        it('should delete a task', async () => {
            const taskData: Task = {
                id: '1',
                name: 'Task 1',
                isActive: true,
                description: 'Sample task 1',
                deadline: new Date(),
            };

            jest.spyOn(prismaClient.task, 'delete').mockResolvedValue(taskData);

            await taskRepository.deleteTask(taskData["id"]);

            expect(prismaClient.task.delete).toHaveBeenCalledTimes(1);
            expect(prismaClient.task.delete).toHaveBeenCalledWith({where: {id: taskData["id"]}});
        });

        it('should throw an error if deleting a task fails', async () => {
            const taskId = '1';
            const errorMessage = ErrorMessages.DB_DELETE_ERROR;

            jest.spyOn(prismaClient.task, 'delete').mockRejectedValue(new Error(errorMessage));

            await expect(taskRepository.deleteTask(taskId)).rejects.toThrowError(errorMessage);
            expect(prismaClient.task.delete).toHaveBeenCalledTimes(1);
            expect(prismaClient.task.delete).toHaveBeenCalledWith({where: {id: taskId}});
        });
    });
});