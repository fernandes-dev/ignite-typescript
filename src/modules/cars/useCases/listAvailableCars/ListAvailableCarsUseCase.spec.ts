import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

describe('List Cars', () => {
  let listAvailableCarsUseCase: ListAvailableCarsUseCase
  let carsRepositoryInMemory: CarsRepositoryInMemory

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    )
  })

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car 1',
      description: 'description for car 1',
      daily_rate: 50,
      license_plate: 'ABC-3214',
      fine_amount: 80.5,
      brand: 'BMW',
      category_id: 'any_category_id',
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car 1',
      description: 'description for car 1',
      daily_rate: 50,
      license_plate: 'ABC-3214',
      fine_amount: 80.5,
      brand: 'Test',
      category_id: 'any_category_id',
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: car.brand,
    })

    expect(cars).toEqual([car])
  })

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car 1',
      description: 'description for car 1',
      daily_rate: 50,
      license_plate: 'ABC-3214',
      fine_amount: 80.5,
      brand: 'Test',
      category_id: 'any_category_id',
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: car.name,
    })

    expect(cars).toEqual([car])
  })

  it('Should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car 1',
      description: 'description for car 1',
      daily_rate: 50,
      license_plate: 'ABC-3214',
      fine_amount: 80.5,
      brand: 'Test',
      category_id: 'any_category_id',
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: car.category_id,
    })

    expect(cars).toEqual([car])
  })
})
