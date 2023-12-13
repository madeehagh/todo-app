import {PrismaClient, Task} from '@prisma/client';
import {TaskRepository} from '../../../src/repository/task.repository';
import {generateUniqueName, taskRequestData} from "../../helper/TestInput";

const prismaClient = new PrismaClient();
let taskRepository:TaskRepository

describe('TaskRepository Integration Test', () => {
    beforeAll(async () => {
        taskRepository = new TaskRepository();
    });

    afterAll(async () => {
        await taskRepository.disconnect();
    });

    beforeEach(async () => {
        await prismaClient.task.deleteMany();
    });

    describe('getAllTasks', () => {
        it('should return all tasks', async () => {
            const task1: Omit<Task, 'id' | 'userId'> = taskRequestData;
            const task2: Omit<Task, 'id' | 'userId'> = {
                ...taskRequestData,
                name: generateUniqueName(5),
            };
            await prismaClient.task.createMany({data: [task1, task2]});

            const tasks = await taskRepository.getAllTasks();

            expect(tasks.length).toBe(2);
        });
    });

    describe('createTask', () => {
        it('should create a task and return the created task', async () => {
            const createdTask = await taskRepository.createTask(taskRequestData);

            const retrievedTask = await prismaClient.task.findUnique({where: {id: createdTask.id}});

            expect(retrievedTask).toEqual(createdTask);
        });
    });

    describe('updateTask', () => {
        it('should update a task and return the updated task', async () => {
            const taskRequest = taskRequestData;
            const createdTask = await prismaClient.task.create({data: taskRequest});
            const updatedTask = await taskRepository.updateTask(createdTask["id"], createdTask);
            const retrievedTask = await prismaClient.task.findUnique({where: {id: updatedTask.id}});

            expect(retrievedTask).toEqual(updatedTask);
        });
    });

    describe('deleteTask', () => {
        it('should delete a task', async () => {
            const taskRequest = taskRequestData;
            taskRequest["id"] = "fb84a843-7fea-48aa-b526-bb1f981d1886";

            await prismaClient.task.create({data: taskRequestData});
            await taskRepository.deleteTask(taskRequest["id"]);
            const retrievedTask = await prismaClient.task.findUnique({where: {id: taskRequest["id"]}});

            expect(retrievedTask).toBeNull();
        });
    });

    describe('getTaskById', () => {
        it('should return a task by ID', async () => {
            const taskRequest = taskRequestData;

            const taskCreated = await prismaClient.task.create({data: taskRequest});

            const retrievedTask = await taskRepository.getTaskById(taskCreated["id"]);

            expect(retrievedTask).toEqual(taskCreated);
        });

        it('should return null if task with ID does not exist', async () => {
            const retrievedTask = await taskRepository.getTaskById('nonexistent-id');

            expect(retrievedTask).toBeNull();
        });
    });
});