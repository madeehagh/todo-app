import { TaskRepository } from "../repository/task.repository";
import { Task } from "../models/task";
import {APILogger} from "../logger/api.logger";

export class TaskService {
    private taskRepository: TaskRepository;
    private logger: APILogger;

    constructor() {
        this.taskRepository = new TaskRepository();
        this.logger = new APILogger();
    }

    async createTask(task: Task): Promise<Task> {
        try {
            return await this.taskRepository.createTask(task);
        } catch (error) {
            this.logger.info("Error creating task:", error);
            throw error;
        }
    }

    async getTasks(): Promise<Task[]> {
        try {
            return await this.taskRepository.getTasks();
        } catch (error) {
            this.logger.error("Error getting tasks:", error);
            throw error;
        }
    }
}