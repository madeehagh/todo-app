// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    // create a dummy task
    const user = await prisma.user.create({
        data: {
            email: 'sabin@adams.com',
            firstName: 'Sabin',
            lastName: 'Adams',
            password: 'password-sabin',
            createdAt: new Date(),
        },
    });

    const task1 = await prisma.task.upsert({
        where: { name: 'Task test1' },
        create: { name: 'Task test1', description: 'task test1', dueDate: new Date() }, // Add the dueDate property with a valid date value
        update: {
            userId: user.id,
        },
    });

    console.log({ user, task1 });
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });