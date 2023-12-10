import { getRepository, Repository } from 'typeorm';
import { Task } from '../entities/task';
import appDataSource from '../db/db.config';

class TaskRepository {
    private taskRepository: Repository<Task>;

    constructor() {
        this.taskRepository = appDataSource.getRepository(Task);
        //this.taskRepository = getRepository(Task, appDataSource.name);
    }

    async getAllTasks(): Promise<Task[]> {
        try {
            const tasks: Task[] = await this.taskRepository.find();
            return tasks;
        } catch (error) {
            throw new Error('Unable to fetch tasks from the database.');
        }
    }

    async saveTask(task: Task): Promise<Task> {
        try {
            const savedTask: Task = await this.taskRepository.save(task);
            return savedTask;
        } catch (error) {
            throw new Error('Unable to save the task to the database.');
        }
    }

    async deleteTask(){

    }
}

export default TaskRepository;