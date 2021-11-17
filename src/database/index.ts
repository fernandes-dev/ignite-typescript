import { PrismaClient } from '.prisma/client'

const database = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL_DOCKER } },
})

export { database }
