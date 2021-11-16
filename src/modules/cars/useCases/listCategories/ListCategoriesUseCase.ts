import { inject, injectable } from 'tsyringe'

import { CategoryType } from '../../entities/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<CategoryType[]> {
    const categories = await this.categoriesRepository.list()

    return categories
  }
}

export { ListCategoriesUseCase }
