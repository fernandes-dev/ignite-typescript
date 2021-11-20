import { Category } from '@modules/cars/infra/prisma/entities/Category'
import { ICreateCategoryDTO } from '@modules/cars/infra/prisma/repositories/CategoriesRepository'

import { ICategoriesRepository } from '../ICategoriesRepository'

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = []

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(c => c.name === name)

    return category
  }

  async list(): Promise<Category[]> {
    return this.categories
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category()

    Object.assign(category, { name, description })

    this.categories.push(category)

    return category
  }
}

export { CategoriesRepositoryInMemory }
