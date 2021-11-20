import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

describe('Create Category', () => {
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory
  let createCategoryUseCase: CreateCategoryUseCase

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('should be able to create a new category', async () => {
    const category = {
      name: 'new category',
      description: 'new category description',
    }

    await createCategoryUseCase.execute(category)

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    )

    expect(createdCategory).toHaveProperty('id')
  })

  it('should not be able to create a new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'new category',
        description: 'new category description',
      }

      await createCategoryUseCase.execute(category)

      await createCategoryUseCase.execute(category)
    }).rejects.toBeInstanceOf(AppError)
  })
})
