import {Prisma, Task} from "@prisma/client";
import prisma from "../database/prisma.client";
import {APILogger} from "../logger/api.logger";
import {DatabaseError} from "../error/database.error";
import {ErrorMessages} from "../constants/error.messages";
import {DefaultArgs} from "@prisma/client/runtime/library";

export class TaskRepository {
    private logger: APILogger;
    private taskClient: Prisma.TaskDelegate<DefaultArgs>;
    constructor() {
        this.logger = new APILogger();
        this.taskClient = prisma.task;
    }

    async getAllTasks(): Promise<Task[]> {
        try {
            return  await this.taskClient.findMany();
        } catch (error) {
            this.logger.error(ErrorMessages.DB_FETCH_ERROR, error);
            throw new DatabaseError(ErrorMessages.DB_FETCH_ERROR);
        } finally {
            await this.disconnect();
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
        } finally {
            await this.disconnect();
        }
    }

    async createTask(task:  Omit<Task, "id" | "userId">): Promise<Task> {
        try {
            return await this.taskClient.create({
                data: { ...task },
            });
        } catch (error) {
            this.logger.error(ErrorMessages.DB_CREATE_ERROR, error);
            throw new DatabaseError(ErrorMessages.DB_CREATE_ERROR);
        } finally {
            await this.disconnect();
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
        } finally {
            await this.disconnect();
        }
    }

    async deleteTask(taskId: string): Promise<void> {
        try {
            await this.taskClient.delete({ where: { id: taskId } });
        } catch (error) {
            this.logger.error(ErrorMessages.DB_DELETE_ERROR, error);
            throw new DatabaseError(ErrorMessages.DB_DELETE_ERROR);
        } finally {
            await this.disconnect();
        }
    }

    /**
     * This method closes connection to the database to prevent resource leaks and to free up system resources.
     */
    async disconnect(): Promise<void> {
//        await this.prisma.$disconnect();
    }
}