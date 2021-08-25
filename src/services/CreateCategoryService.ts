import { CategoriesRepository } from '../repositories/CategoriesRepository'

interface IRequest {
  name: string
  description: string
}

class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) { }

  execute({ name, description }: IRequest): void {
    const categoryExistent = this.categoriesRepository.findByName(name)

    if (categoryExistent) throw new Error('Category already exists')

    const category = this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryService }
