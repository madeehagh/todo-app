import {PrismaClient, User} from '@prisma/client';
import {userRequestData} from "../../helper/TestInput";
import {UserRepository} from '../../../src/repository/user.repository';

const prismaClient = new PrismaClient();
const userRepository = new UserRepository();

describe('User Repository Integration Test', () => {
    describe('createUser', () => {
        it('should create a task and return the created task', async () => {
            const createdUser = await userRepository.createUser(userRequestData);
            const retrievedTask = await prismaClient.user.findUnique({where: {id: createdUser.id}});
            expect(retrievedTask).toEqual(createdUser);
        });
    });

});