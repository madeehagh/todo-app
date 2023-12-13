import {PrismaClient, User} from '@prisma/client';
import {userRequestData} from "../../helper/TestInput";
import {UserRepository} from '../../../src/repository/user.repository';
import {TaskRepository} from "../../../src/repository/task.repository";

const prismaClient = new PrismaClient();
let userRepository: UserRepository;

describe('User Repository Integration Test', () => {

    beforeAll(async () => {
        userRepository  = new UserRepository();
    });

    afterAll(async () => {
        await userRepository.disconnect();
    });

    beforeEach(async () => {
        await prismaClient.task.deleteMany();
    });

    describe('createUser', () => {
        it('should create a task and return the created task', async () => {
            const createdUser = await userRepository.createUser(userRequestData);
            const retrievedTask = await prismaClient.user.findUnique({where: {id: createdUser.id}});
            expect(retrievedTask).toEqual(createdUser);
        });
    });

});