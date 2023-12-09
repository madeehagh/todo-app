import {TaskRepository} from "../repository/task.repository";

export class TaskService {
    private taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async createTask(task) {
        return await this.taskRepository.createTask(task);
    }

    async getTasks() {
        return await this.taskRepository.getTasks();
    }
}