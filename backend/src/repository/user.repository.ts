import {APILogger} from "../logger/api.logger";
import prisma from "../database/prisma.client";
import {ErrorMessages} from "../constants/error.messages";
import {DatabaseError} from "../error/database.error";
import {User} from "@prisma/client";

export class UserRepository {
    private logger: APILogger;
    private userClient;

    constructor() {
        this.logger = new APILogger();
        this.userClient = prisma.user;
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
             this.disconnect().then(r => this.logger.info('connection closed'));
        }
    }

    //TODO: Add more methods for the user flow

    /**
     * This method closes connection to the database to prevent resource leaks and to free up system resources.
     */
    async disconnect(): Promise<void> {
       // await this.prisma.$disconnect();
    }
}