import { categories, Prisma, PrismaClient } from '.prisma/client'

export type CategoryEntity = Prisma.categoriesDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>

export type CategoryType = categories

class Category {
  private categories: CategoryEntity

  constructor() {
    const prisma = new PrismaClient()

    this.categories = prisma.categories
  }

  instance(): CategoryEntity {
    return this.categories
  }
}

export { Category }
