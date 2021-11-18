import { CategoryType, Category } from '@modules/cars/entities/Category'

import { ICategoriesRepository } from '../ICategoriesRepository'
import { ICreateCategoryDTO } from '../implementations/CategoriesRepository'

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: CategoryType[] = []

  async findByName(name: string): Promise<CategoryType> {
    const category = this.categories.find(c => c.name === name)

    return category
  }

  async list(): Promise<CategoryType[]> {
    return this.categories
  }

  async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<CategoryType> {
    const category = new Category()

    Object.assign(category, { name, description })

    this.categories.push(category)

    return category
  }
}

export { CategoriesRepositoryInMemory }
