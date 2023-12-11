import { PrismaClient, Task } from "@prisma/client";
import { APILogger } from "../logger/api.logger";
import {DatabaseError} from "../error/database.error";
import {ErrorMessages} from "../constants/error.messages";

export class TaskRepository {
    private logger: APILogger;
    private taskClient;

    constructor() {
        this.logger = new APILogger();
        this.taskClient = new PrismaClient().task;
    }

    async getAllTasks(): Promise<Task[]> {
        try {
            return  await this.taskClient.findMany();
        } catch (error) {
            this.logger.error(ErrorMessages.DB_FETCH_ERROR, error);
            throw new DatabaseError(ErrorMessages.DB_FETCH_ERROR);
        }
    }

    async getTaskById(taskId: string): Promise<Task | null> {
        try {
            return  await this.taskClient.findUnique({
                where: { id: taskId },
            });
        } catch (error) {
            this.logger.error(ErrorMessages.DB_FETCH_ERROR, error);
            throw new DatabaseError(ErrorMessages.DB_FETCH_ERROR);
        }
    }

    async createTask(task:  Omit<Task, "id">): Promise<Task> {
        try {
            return await this.taskClient.create({
                data: { ...task },
            });
        } catch (error) {
            this.logger.error(ErrorMessages.DB_CREATE_ERROR, error);
            throw new DatabaseError(ErrorMessages.DB_CREATE_ERROR);
        }
    }

    async updateTask(taskId: string, updatedTask: Partial<Task>): Promise<Task | null> {
        try {
            return await this.taskClient.update({
                where: { id: taskId },
                data: { ...updatedTask },
            });
        } catch (error) {
            this.logger.error(ErrorMessages.DB_UPDATE_ERROR, error);
            throw new DatabaseError(ErrorMessages.DB_UPDATE_ERROR);
        }
    }

    async deleteTask(taskId: string): Promise<void> {
        try {
            await this.taskClient.delete({ where: { id: taskId } });
        } catch (error) {
            this.logger.error(ErrorMessages.DB_DELETE_ERROR, error);
            throw new DatabaseError(ErrorMessages.DB_DELETE_ERROR);
        }
    }
}