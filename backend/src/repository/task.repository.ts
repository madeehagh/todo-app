import {APILogger} from '../logger/api.logger';
import {Task} from '../models/task';
import {connect} from '../config/db.config';

export class TaskRepository {
    private logger: APILogger
    private db: any = {}
    private taskRepository: any

    constructor() {
        this.db = connect();
        this.taskRepository = this.db.sequelize.getRepository(Task)
    }

    async createTask(task) {
        let data = {}
        let allTasks = {}
        try {
            data = await this.taskRepository.create(task)
            allTasks = await this.taskRepository.findAll()
        } catch(err) {
            this.logger.error('Error::' + err)
            throw err;
        }
        return {
            message: "Task created successfully",
            task: data,
            tasks: allTasks
        }
    }

    async getTasks() {

        try {
            const tasks = await this.taskRepository.findAll()
            console.log('tasks:::', tasks)
            return {tasks}
        } catch (err) {
            console.log(err)
            return []
        }
    }
}