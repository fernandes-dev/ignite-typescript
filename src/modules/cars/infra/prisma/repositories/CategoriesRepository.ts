import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

import { CategoryEntity, Category, CategoryType } from '../entities/Category'

interface ICreateCategoryDTO {
  name: string
  description: string
}

class CategoriesRepository implements ICategoriesRepository {
  private repository: CategoryEntity

  constructor() {
    this.repository = Category.instance()
  }

  async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<CategoryType> {
    const category = await this.repository.create({
      data: { name, description },
    })

    return category
  }

  async list(): Promise<CategoryType[]> {
    const categories = await this.repository.findMany()

    return categories
  }

  async findByName(name: string): Promise<CategoryType> {
    const category = await this.repository.findFirst({ where: { name } })

    return category
  }
}

export { CategoriesRepository, ICreateCategoryDTO }
