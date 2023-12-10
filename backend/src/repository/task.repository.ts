import { getRepository, Repository } from 'typeorm';
import { Task } from '../models/task';
import appDataSource from '../db/db.config';

// Create a repository instance using the appDataSource connection
const taskRepository: Repository<Task> = getRepository(Task, appDataSource.name);

// Get all tasks
async function getAllTasks(): Promise<Task[]> {
    try {
        const tasks: Task[] = await taskRepository.find();
        return tasks;
    } catch (error) {
        throw new Error('Unable to fetch tasks from the database.');
    }
}

// Save a task
async function saveTask(task: Task): Promise<Task> {
    try {
        const savedTask: Task = await taskRepository.save(task);
        return savedTask;
    } catch (error) {
        throw new Error('Unable to save the task to the database.');
    }
}

export { getAllTasks, saveTask };