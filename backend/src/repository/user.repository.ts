import {APILogger} from "../logger/api.logger";
import {PrismaClient, User} from "@prisma/client";
import {ErrorMessages} from "../constants/error.messages";
import {DatabaseError} from "../error/database.error";

export class UserRepository {
    private logger: APILogger;
    private userClient;

    constructor() {
        this.logger = new APILogger();
        this.userClient = new PrismaClient().user;
    }

    async createUser(user:  Omit<User, "id">): Promise<User> {
        try {
            return await this.userClient.create({
                data: { ...user },
            });
        } catch (error) {
            this.logger.error(ErrorMessages.DB_CREATE_ERROR, error);
            throw new DatabaseError(ErrorMessages.DB_CREATE_ERROR);
        }
    }
}