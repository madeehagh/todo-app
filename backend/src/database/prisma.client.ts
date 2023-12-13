import { PrismaClient } from '@prisma/client'

/**
 * The PrismaClient object is created when first time the module is imported.
 * Subsequent requests return the cached object rather than creating a new PrismaClient
 * We don't have to explicitly handle db connection. This provides lazy loading of DB pool
 * Default connection pool size: 13
 */
let prisma = new PrismaClient({
    //We can add more configurations to get insight about DB connections in connection pool
    log: ['info'],
})

export default prisma