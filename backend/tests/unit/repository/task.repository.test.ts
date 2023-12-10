import TaskRepository from "../../../src/repository/task.repository";
import {Task} from "../../../src/entities/task";

describe('TaskRepository', () => {
    let taskRepository: TaskRepository;

    beforeEach(() => {
        // Create a new instance of TaskRepository before each test
        taskRepository = new TaskRepository();
    });

    afterEach(() => {
        // Clean up any created tasks after each test
        // You may need to implement a delete method in the TaskRepository class to delete tasks
        // Uncomment the following line if you have a delete method
        // taskRepository.deleteTask();
    });

    it('should save a task to the database', async () => {
        // Create a new task object
        const task: Task = {
            id: 1,
            name: 'Test Task',
            description: 'This is a test task',
            status: 'ACTIVE',
            deadline: new Date().toISOString()
        };

        // Save the task to the database
        const savedTask = await taskRepository.saveTask(task);

        // Expect the saved task to have an ID assigned
        expect(savedTask.id).toBeDefined();

        // Expect the saved task to have the same properties as the original task
        expect(savedTask.name).toBe(task.name);
        expect(savedTask.description).toBe(task.description);
        expect(savedTask.status).toBe(task.status);
        expect(savedTask.deadline).toBe(task.deadline);
    });

    // Add more test cases for different scenarios if needed
});