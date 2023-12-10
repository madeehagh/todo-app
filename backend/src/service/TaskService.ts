import { Task } from '../entities/task';
import TaskRepository from "../repository/task.repository";

export class TaskService {
    private taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async getAllTasks(): Promise<Task[]> {
        try {
            const tasks: Task[] = await this.taskRepository.getAllTasks();
            return tasks;
        } catch (error) {
            console.error('Failed to fetch tasks from the database:', error);
            throw new Error('Unable to fetch tasks from the database.');
        }
    }

    async saveTask(task: Task): Promise<Task> {
        try {
            const savedTask: Task = await this.taskRepository.saveTask(task);
            return savedTask;
        } catch (error) {
            console.error('Failed to save the task to the database:', error);
            throw new Error('Unable to save the task to the database.');
        }
    }

    async updateTask(task: Task): Promise<Task> {
        try {
            const updatedTask: Task = await this.taskRepository.saveTask(task);
            return updatedTask;
        } catch (error) {
            console.error('Failed to update the task in the database:', error);
            throw new Error('Unable to update the task in the database.');
        }
    }

    async deleteTask(id: number): Promise<void> {
        try {
            await this.taskRepository.deleteTask();
        } catch (error) {
            console.error('Failed to delete the task from the database:', error);
            throw new Error('Unable to delete the task from the database.');
        }
    }

/*    async getTaskById(taskId: number): Promise<Task | undefined> {
        try {
            const task: Task | undefined = await this.taskRepository.getTaskById(taskId);
            return task;
        } catch (error) {
            console.error('Failed to fetch the task from the database:', error);
            throw new Error('Unable to fetch the task from the database.');
        }
    }*/
}