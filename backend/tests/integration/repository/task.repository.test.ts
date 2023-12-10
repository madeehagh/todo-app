import { TaskRepository } from "../../../src/repository/task.repository";
import { connect } from "../../../src/config/db.config";
import { Task } from "../../../src/models/task";

describe('TaskRepository Integration Test', () => {
    let taskRepository: TaskRepository;

    beforeAll(async () => {
        await connect();
        taskRepository = new TaskRepository();
    });

    afterAll(async () => {
    });

    describe('createTask', () => {
        it('should create a task and return success message', async () => {
            const req = {
                name: 'Task 1',
                description: 'Task description',
                status: true,
                deadline: '2022-12-31',
            };

            const task: Task = new Task(req);

            const result = await taskRepository.createTask(task);

            expect(result).toEqual({ message: 'Task created successfully' });
        });

    });

    describe('getTasks', () => {
        it('should return an array of tasks', async () => {
            const result = await taskRepository.getTasks();

            expect(Array.isArray(result.tasks)).toBe(true);
        });

    });
});