import 'reflect-metadata'
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory'
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

    console.log(createdCategory)

    expect(createdCategory).toHaveProperty('id')
  })
})
