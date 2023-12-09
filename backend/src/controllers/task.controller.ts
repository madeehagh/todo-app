import {APILogger} from '../logger/api.logger';
import {TaskService} from "../service/task.service";


export class TaskController {
    private logger: APILogger;
    private taskService: TaskService;

    constructor() {
        this.logger = new APILogger();
        this.taskService = new TaskService();
    }

    async createTask(task) {
        this.logger.info('Controller: createTask', task);
        return await this.taskService.createTask(task);
    }

    async getTasks() {
        return await this.taskService.getTasks();
    }
}
