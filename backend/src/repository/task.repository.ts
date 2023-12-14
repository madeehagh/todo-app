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

    async createTask(task:  Omit<Task, "id" | "userId">): Promise<Task> {
        try {
            return await this.taskClient.create({
                data: { ...task },
            });
        } catch (error) {
            this.logger.error(ErrorMessages.DB_CREATE_ERROR, error);
            throw new DatabaseError(ErrorMessages.DB_CREATE_ERROR);
        }
    }

    async updateTask(
        taskId: string,
        userId?: string,
        updatedTask?: Partial<Task>
    ): Promise<Task | null> {
        try {
            const task = await this.taskClient.findUnique({
                where: { id: taskId },
            });

            if (!task) {
                throw new Error("Task not found");
            }
            if (userId) {
                if (task.userId !== userId) {
                    throw new Error("User is not authorized to update this task");
                }
            }

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

    async getTaskByName(taskName: string): Promise<Task | null> {
        try {
            return await this.taskClient.findFirst({
                where: { name: taskName },
            });
        } catch (error) {
            this.logger.error(ErrorMessages.DB_TASK_EXIST, error);
            throw new DatabaseError(ErrorMessages.DB_TASK_EXIST);
        }
    }
}