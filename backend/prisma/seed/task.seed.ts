/**
 * Create a dummy task
 */
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    const post = await prisma.task.create({
        data: {
            name: 'Task test1',
            description: "task test1",
            dueDate: new Date(),
        },
    });

    console.log({ post });
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