import { v4 as uuidV4 } from 'uuid'

import { database } from '@shared/infra/prisma/databaseConnection'

import { categories, Prisma } from '.prisma/client'

export type CategoryEntity = Prisma.categoriesDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>

export type CategoryType = categories

class Category {
  private static categories: CategoryEntity

  id: string

  name: string

  description: string

  created_at: Date

  constructor() {
    return {
      id: uuidV4(),
      name: this.name,
      description: this.description,
      created_at: new Date(),
    }
  }

  static instance(): CategoryEntity {
    if (!this.categories) this.categories = database.categories

    return this.categories
  }
}

export { Category }
