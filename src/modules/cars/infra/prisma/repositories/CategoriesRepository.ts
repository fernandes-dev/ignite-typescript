import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { Prisma } from '@prisma/client'
import { database } from '@shared/infra/prisma/databaseConnection'

import { Category } from '../entities/Category'

interface ICreateCategoryDTO {
  name: string
  description: string
}

class CategoriesRepository implements ICategoriesRepository {
  private repository: Prisma.categoriesDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >

  constructor() {
    this.repository = database.categories
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = await this.repository.create({
      data: { name, description },
    })

    return category
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.findMany()

    return categories
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findFirst({ where: { name } })

    return category
  }
}

export { CategoriesRepository, ICreateCategoryDTO }
