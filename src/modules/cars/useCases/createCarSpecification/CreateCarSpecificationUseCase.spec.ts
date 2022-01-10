import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

describe('Create Car Specification', () => {
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase
  let carsRepositoryInMemory: CarsRepositoryInMemory
  let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    )
  })

  it('Should not be able to add a new specification to non existent car', async () => {
    const car_id = '1234'
    const specifications_id = ['54321']

    expect(async () => {
      await createCarSpecificationUseCase.execute({ specifications_id, car_id })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'name car',
      description: 'an car description',
      daily_rate: 100,
      license_plate: 'UED-321',
      fine_amount: 60,
      brand: 'BMW',
      category_id: 'category-id',
    })

    const car_id = car.id

    const specification = await specificationsRepositoryInMemory.create({
      name: 'teste',
      description: 'teste',
    })

    const specifications_id = [specification.id]

    const specificationsCars = await createCarSpecificationUseCase.execute({
      specifications_id,
      car_id,
    })

    expect(specificationsCars).toHaveProperty('specifications')
    expect(specificationsCars.specifications.length).toBe(1)
  })
})
