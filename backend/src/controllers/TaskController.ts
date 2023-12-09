import {APILogger} from '../logger/ApiLogger';
import { Request, Response } from 'express';


export class TaskController {
    private logger: APILogger;

    constructor() {
        this.logger = new APILogger();
    }

    public getAllTasks = async (req: Request, res: Response): Promise<void> => {
        try {
            const tasks = await Task.find();
            res.status(200).json(tasks);
        } catch (error) {
            this.logger.error('Error while fetching tasks:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}
