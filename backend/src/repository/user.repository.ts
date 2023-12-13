import {APILogger} from "../logger/api.logger";
import {PrismaClient, User} from "@prisma/client";
import {ErrorMessages} from "../constants/error.messages";
import {DatabaseError} from "../error/database.error";

export class UserRepository {
    private logger: APILogger;
    private userClient;
    private prisma: PrismaClient;

    constructor() {
        this.logger = new APILogger();
        this.prisma = new PrismaClient();
        this.userClient = this.prisma.user;
    }

    async createUser(user:  Omit<User, "id">): Promise<User> {
        try {
            return await this.userClient.create({
                data: { ...user },
            });
        } catch (error) {
            this.logger.error(ErrorMessages.DB_CREATE_ERROR, error);
            throw new DatabaseError(ErrorMessages.DB_CREATE_ERROR);
        } finally {
            await this.disconnect();
        }
    }

    //TODO: Add more methods for the user flow

    /**
     * This method closes connection to the database to prevent resource leaks and to free up system resources.
     */
    async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
    }
}