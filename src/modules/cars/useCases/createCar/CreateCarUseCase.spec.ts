import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { CreateCarUseCase } from './CreateCarUseCase'

describe('Create Car', () => {
  let createCarUseCase: CreateCarUseCase
  let carsRepositoryInMemory: CarsRepositoryInMemory

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'name car',
      description: 'an car description',
      daily_rate: 100,
      license_plate: 'UED-321',
      fine_amount: 60,
      brand: 'BMW',
      category_id: 'category-id',
    })

    expect(car).toHaveProperty('id')
  })

  it('should be not able create a new car if exists license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'name car 1',
        description: 'an car description',
        daily_rate: 100,
        license_plate: 'UED-321',
        fine_amount: 60,
        brand: 'BMW',
        category_id: 'category-id',
      })

      await createCarUseCase.execute({
        name: 'name car 2',
        description: 'an car description',
        daily_rate: 100,
        license_plate: 'UED-321',
        fine_amount: 60,
        brand: 'BMW',
        category_id: 'category-id',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a car with availabe true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'name car',
      description: 'an car description',
      daily_rate: 100,
      license_plate: 'UED-321',
      fine_amount: 60,
      brand: 'BMW',
      category_id: 'category-id',
    })

    expect(car.available).toBe(true)
  })
})
