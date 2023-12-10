import { TaskRepository } from "../../../src/repository/task.repository";
import { Task } from "../../../src/models/task";
import {Sequelize} from "sequelize-typescript";

describe('TaskRepository', () => {
    let taskRepository: TaskRepository;
    let mockedSequelize: Sequelize;

    beforeAll(async () => {
        mockedSequelize = new Sequelize({
            database: 'todo-test',
            dialect: 'sqlite',
            username: 'root',
            password: '',
            validateOnly: true,
            models: [__dirname + '/models'],
        });
        await mockedSequelize.sync({ force: true });
        taskRepository = new TaskRepository();
    });

    afterAll(async () => {
        await mockedSequelize.close(); // Close the database connection after all tests
    });

    describe('createTask', () => {
        it('should create a task and return success message', async () => {
            const taskData = {
                name: 'Task 1',
                description: 'Task description',
                status: true,
                deadline: '2022-12-31',
                dataValues: {},
                _creationAttributes: {},
                isNewRecord: true,
            };

            const result = await taskRepository.createTask(<Task>taskData);

            expect(result).toEqual({ message: 'Task created successfully' });
        });

        it('should throw an error if task creation fails', async () => {
            const taskData = {
                name: 'Task 1',
                description: 'Task description',
                status: true,
                deadline: '2022-12-31',
                dataValues: {},
                isNewRecord: true,
            };

            // Mock the create method to throw an error
            jest.spyOn(taskRepository.getTaskRepository(), 'create').mockRejectedValue(new Error('Task creation failed'));

            await expect(taskRepository.createTask(<Task>taskData)).rejects.toThrow('Task creation failed');
        });
    });

    // Rest of the test cases...
});