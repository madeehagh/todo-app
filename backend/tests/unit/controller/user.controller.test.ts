import { Request, Response } from 'express';
import { UserController } from '../../../src/controllers/user.controller';
import { UserRepository } from '../../../src/repository/user.repository';
import { ErrorMessages } from '../../../src/constants/error.messages';
import {userRequestData, userResponseData} from "../../helper/TestInput";
import {DatabaseError} from "../../../src/error/database.error";

describe('TaskController', () => {
    let userController: UserController;
    let userRepository: UserRepository;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        userRepository = new UserRepository();
        userController = new UserController();
        req = {} as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
    });

    describe('createTask', () => {
        it('should create a user and return the created user', async () => {

            jest.spyOn(userRepository, 'createUser')
                .mockImplementation(
                    async (user)=> {
                return userResponseData;
            });
            req.body = userRequestData;

            await userController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should handle errors and return 500 status', async () => {
            const errorMessage = ErrorMessages.APPLICATION_ERROR;
            jest.spyOn(userRepository, 'createUser').mockRejectedValue(new DatabaseError(errorMessage));
            req.body = userRequestData;

            await userController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
});