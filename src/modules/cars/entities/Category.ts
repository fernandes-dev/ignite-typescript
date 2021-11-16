import { categories, Prisma } from '.prisma/client'

import { database } from '../../../database'

export type CategoryEntity = Prisma.categoriesDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>

export type CategoryType = categories

class Category {
  private categories: CategoryEntity

  constructor() {
    this.categories = database.categories
  }

  instance(): CategoryEntity {
    return this.categories
  }
}

export { Category }
