import { category, Prisma, PrismaClient } from '.prisma/client'

export type CategoryEntity = Prisma.categoryDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>

export type CategoryType = category

class Category {
  private category: CategoryEntity

  constructor() {
    const prisma = new PrismaClient()

    this.category = prisma.category
  }

  instance(): CategoryEntity {
    return this.category
  }
}

export { Category }
