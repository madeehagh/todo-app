import { APILogger } from '../logger/api.logger';
import { Task } from '../models/task';
import { connect } from '../config/db.config';

export class TaskRepository {
    private logger: APILogger;
    private db: any = {};
    private taskRepository: any;

    constructor() {
        this.logger = new APILogger();
        this.db = null;
        this.taskRepository = null;
        this.initialize().catch((error) => {
            this.logger.error('Unable to initialize the task repository:', error);
            throw error;
        });
    }

    private async initialize() {
        try {
            this.db = await connect();
            this.taskRepository = this.db?.sequelize?.models.Task; // Update this line
        } catch (error) {
            this.logger.error('Error:', error?.message || error);
            throw error;
        }
    }

    private async ensureInitialized() {
        if (!this.taskRepository) {
            await this.initialize();
        }
    }

    public async createTask(task: Partial<Task>): Promise<any> {
        await this.ensureInitialized();

        try {
            await this.taskRepository.create(task);
        } catch (err) {
            this.logger.error('Error:', err?.message || err);
            throw err;
        }
        return {
            message: 'Task created successfully'
        };
    }

    async getTasks(): Promise<any> {
        await this.ensureInitialized();

        try {
            const tasks = await this.taskRepository.findAll();
            this.logger.info('tasks retrieved from repo:::', tasks);
            return { tasks };
        } catch (err) {
            this.logger.error('Error:', err?.message || err);
            return [];
        }
    }

    /**
     * Added this method to access taskRepository in test cases
     */
    public getTaskRepository(): any {
        return this.taskRepository;
    }
}