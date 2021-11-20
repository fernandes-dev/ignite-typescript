import { v4 as uuidV4 } from 'uuid'

import { database } from '@shared/infra/prisma/databaseConnection'

import { Prisma } from '.prisma/client'

export type CategoryEntity = Prisma.categoriesDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>

class Category {
  private static categories: CategoryEntity

  id: string

  name: string

  description: string

  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
      this.created_at = new Date()
    }
  }

  static instance(): CategoryEntity {
    if (!this.categories) this.categories = database.categories

    return this.categories
  }
}

export { Category }
