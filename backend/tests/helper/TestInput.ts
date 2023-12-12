import { Task, User } from '@prisma/client';
import { ErrorMessages } from '../../src/constants/error.messages';

export const generateUniqueName = (length: number): string => {
    let uniqueName = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        uniqueName += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return uniqueName;
};

export const taskRequestData: Omit<Task, 'id' | 'userId'> = {
    name: generateUniqueName(10),
    isActive: true,
    description: 'Sample task 1',
    dueDate: new Date(),
};

export const taskResponseData: Task = {
    id: '1',
    name: 'Task 1',
    isActive: true,
    description: 'Sample task 1',
    dueDate: new Date(),
    userId: '',
};

export const userRequestData: Omit<User, 'id' >= {
    email: generateUniqueName(10) + 'sabin@adams.com',
    firstName: 'Sabin',
    lastName: 'Adams',
    password: 'password-sabin',
    createdAt: new Date(),
};

export const userResponseData: User= {
    id: "1",
    email: generateUniqueName(10) + 'sabin@adams.com',
    firstName: 'Sabin',
    lastName: 'Adams',
    password: 'password-sabin',
    createdAt: new Date(),
};

export const responseTaskData = async () => {
    return {
        data: {
            allTasks: [
                {
                    id: '1',
                    name: 'Task 1',
                    isActive: true,
                    description: 'Sample task 1',
                    dueDate: new Date(),
                },
                {
                    id: '2',
                    name: 'Task 2',
                    isActive: true,
                    description: 'Sample task 2',
                    dueDate: new Date(),
                },
                {
                    id: '3',
                    name: 'Task 3',
                    isActive: true,
                    description: 'Sample task 3',
                    dueDate: new Date(),
                },
            ],
        },
    };
};