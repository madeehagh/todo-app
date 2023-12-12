import {APILogger} from "../logger/api.logger";
import {UserRepository} from "../repository/user.repository";
import {Request, Response} from "express";
import { User} from "@prisma/client";
import {ApiResponse} from "../response/api.response";
import {ErrorMessages} from "../constants/error.messages";

export class UserController {
    private logger: APILogger;
    private userRepository: UserRepository;

    constructor() {
        this.logger = new APILogger();
        this.userRepository = new UserRepository();
    }

    /**
     * @api {post} /user Create User
     * @apiName CreateUser
     * @apiGroup User
     *
     * @apiBody {Object} user User object.
     * @apiSuccess {Object} user Created user object.
     * @apiError (Error 500) InternalServerError An error occurred while creating the user.
     *
     * @apiExample {curl} Example usage:
     *     curl -X POST -H "Content-Type: application/json" -d '{"lastName": "Doe", "firstName": "John", "email": "john@example.com"}' http://localhost:3000/v1/user/signup
     */
    createUser = async (req: Request, res: Response): Promise<void> => {
        //TODO: add validation on request
        const apiResponse = new ApiResponse(res);
        try {
            const user: User = req.body as User;
             await this.userRepository.createUser(user);
            apiResponse.success(user);
        } catch (error: any) {
            this.logger.error(ErrorMessages.APPLICATION_ERROR, error);
            apiResponse.error(ErrorMessages.APPLICATION_ERROR, 500);
        }
    };
}