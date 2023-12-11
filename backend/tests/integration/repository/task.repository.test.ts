import {PrismaClient, Task} from '@prisma/client';
import {TaskRepository} from '../../../src/repository/task.repository';
import {taskData} from "../../helper/TestInput";

const prismaClient = new PrismaClient();
const taskRepository = new TaskRepository();

describe('TaskRepository Integration Test', () => {
    beforeAll(async () => {
        await prismaClient.$connect();
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    beforeEach(async () => {
        await prismaClient.task.deleteMany();
    });

    describe('getAllTasks', () => {
        it('should return all tasks', async () => {
            const task1: Task = {
                id: '1', name: 'Task 1', isActive: true, description: 'Sample task 1', deadline: new Date(),
            };
            const task2: Task = {
                id: '2', name: 'Task 2', isActive: true, description: 'Sample task 2', deadline: new Date(),
            };
            await prismaClient.task.createMany({data: [task1, task2]});

            const tasks = await taskRepository.getAllTasks();

            expect(tasks.length).toBe(2);
        });
    });

    describe('createTask', () => {
        it('should create a task and return the created task', async () => {
            const createdTask = await taskRepository.createTask(taskData);

            const retrievedTask = await prismaClient.task.findUnique({where: {id: createdTask.id}});

            expect(retrievedTask).toEqual(createdTask);
        });
    });

    describe('updateTask', () => {
        it('should update a task and return the updated task', async () => {
            await prismaClient.task.create({data: taskData});

            const updatedTaskData: Task = {
                id: '1',
                name: 'Updated Task',
                isActive: false,
                description: 'Updated task description',
                deadline: new Date(),
            };

            const updatedTask = await taskRepository.updateTask(taskData.id, updatedTaskData);

            const retrievedTask = await prismaClient.task.findUnique({where: {id: updatedTask.id}});

            expect(retrievedTask).toEqual(updatedTask);
        });
    });

    describe('deleteTask', () => {
        it('should delete a task', async () => {
            await prismaClient.task.create({data: taskData});

            await taskRepository.deleteTask(taskData.id);

            const retrievedTask = await prismaClient.task.findUnique({where: {id: taskData.id}});

            expect(retrievedTask).toBeNull();
        });
    });

    describe('getTaskById', () => {
        it('should return a task by ID', async () => {

            await prismaClient.task.create({data: taskData});

            const retrievedTask = await taskRepository.getTaskById(taskData.id);

            expect(retrievedTask).toEqual(taskData);
        });

        it('should return null if task with ID does not exist', async () => {
            const retrievedTask = await taskRepository.getTaskById('nonexistent-id');

            expect(retrievedTask).toBeNull();
        });
    });
});