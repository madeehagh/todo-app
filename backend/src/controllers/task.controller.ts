import {APILogger} from "../logger/api.logger";
import {TaskService} from "../service/task.service";
import {Task} from "../models/task";

export class TaskController {
    private logger: APILogger;
    private taskService: TaskService;

    constructor() {
        this.logger = new APILogger();
        this.taskService = new TaskService();
        this.getTasks = this.getTasks.bind(this);
    }

    async createTask(task: Task): Promise<Task> {
        try {
            if (!this.logger) {
                this.logger = new APILogger();
            }
            this.logger.info('Controller: createTask', task);
            return await this.taskService.createTask(task);
        } catch (error) {
            this.logger.error('Error creating task:', error);
            throw error;
        }
    }

    async getTasks(): Promise<Task[]> {
        try {
             const task = await this.taskService.getTasks();
            this.logger.info('Controller: getTasks',{});
            return task;
        } catch (error) {
            this.logger.error('Error getting tasks:', error);
            throw error;
        }
    }
}