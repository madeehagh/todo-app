import { Task } from '../models/task';
import appDataSource from '../db/db.config';
import { Repository } from 'typeorm';
import {plainToInstance} from "class-transformer";

export class TaskService {
    private taskRepository: Repository<Task>;

    constructor() {
        this.taskRepository = appDataSource.getRepository(Task);
    }

    // Get all tasks
    async getAllTasks(): Promise<Task[]> {
        try {
            const tasks: Task[] = await this.taskRepository.find();
            return tasks;
        } catch (error) {
            throw new Error('Unable to fetch tasks from the database.');
        }
    }

    // Save a task
    async saveTask(task: Task): Promise<Task> {
        try {
            const savedTask: Task = await this.taskRepository.save(task);
            return savedTask;
        } catch (error) {
            throw new Error('Unable to save the task to the database.');
        }
    }

    // Update a task
    async updateTask(task: Task): Promise<Task> {
        try {
            const updatedTask: Task = await this.taskRepository.save(task);
            return updatedTask;
        } catch (error) {
            throw new Error('Unable to update the task in the database.');
        }
    }

    // Delete a task
    async deleteTask(id: number): Promise<void> {
        try {
            await this.taskRepository.delete(id);
        } catch (error) {
            throw new Error('Unable to delete the task from the database.');
        }
    }

    async getTaskById(taskId: number) {
        return undefined;
    }
}