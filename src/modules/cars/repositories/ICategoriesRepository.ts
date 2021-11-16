import { CategoryType } from '../entities/Category'
import { ICreateCategoryDTO } from './implementations/CategoriesRepository'

interface ICategoriesRepository {
  findByName(name: string): Promise<CategoryType>
  list(): Promise<CategoryType[]>
  create({ name, description }: ICreateCategoryDTO): Promise<CategoryType>
}

export { ICategoriesRepository }
