import { Category } from '../infra/prisma/entities/Category'
import { ICreateCategoryDTO } from '../infra/prisma/repositories/CategoriesRepository'

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>
  list(): Promise<Category[]>
  create({ name, description }: ICreateCategoryDTO): Promise<Category>
}

export { ICategoriesRepository }
