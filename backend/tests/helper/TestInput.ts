import { Task } from '@prisma/client';
import {ErrorMessages} from "../../src/constants/error.messages";

export const taskData: Task = {
    id: '1',
    name: 'Task 1',
    isActive: true,
    description: 'Sample task 1',
    deadline: new Date(),
};

export const responseTaskData = async () => {
    return {
        data: [
            {
                id: "1",
                name: "Task 1",
                isActive: true,
                description: "Sample task 1",
                deadline: new Date(),
            },
            {
                id: "2",
                name: "Task 2",
                isActive: true,
                description: "Sample task 2",
                deadline: new Date(),
            },
            {
                id: "3",
                name: "Task 3",
                isActive: true,
                description: "Sample task 3",
                deadline: new Date(),
            }
        ]
    }
};
export const ErrorResponse = async () => {
    return {
        status: 500,
        body:
            { error: ErrorMessages.APPLICATION_ERROR }
    }
};