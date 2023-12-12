import {PrismaClient, User} from '@prisma/client';
import {UserRepository} from '../../../src/repository/user.repository';
import {ErrorMessages} from "../../../src/constants/error.messages";
import {userRequestData, userResponseData} from "../../helper/TestInput";

// Mock the PrismaClient
jest.mock('@prisma/client', () => {
    const userMock = {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    const prismaClientMock = {
        user: userMock,
    };

    return {
        PrismaClient: jest.fn().mockImplementation(() => prismaClientMock),
    };
});

describe('UserRepository', () => {
    let userRepository: UserRepository;
    let prismaClient: PrismaClient;

    beforeEach(() => {
        userRepository = new UserRepository();
        prismaClient = new PrismaClient();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should create a user and return the created user', async () => {
            jest.spyOn(prismaClient.user, 'create').mockResolvedValue(userResponseData);

            const createdUser = await userRepository.createUser(userRequestData);

            expect(createdUser).toEqual(userResponseData);
            expect(prismaClient.user.create).toHaveBeenCalledWith({data: userRequestData});
        });

        it('should throw an error if creating a user fails', async () => {
            const errorMessage = ErrorMessages.DB_CREATE_ERROR;

            jest.spyOn(prismaClient.user, 'create').mockRejectedValue(new Error(errorMessage));

            await expect(userRepository.createUser(userRequestData)).rejects.toThrowError(errorMessage);
            expect(prismaClient.user.create).toHaveBeenCalledTimes(1);
            expect(prismaClient.user.create).toHaveBeenCalledWith({data: userRequestData});
        });
    });
});