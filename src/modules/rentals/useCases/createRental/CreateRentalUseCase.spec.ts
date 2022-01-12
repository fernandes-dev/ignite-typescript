import dayjs from 'dayjs'

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateRentalUseCase } from './CreateRentalUseCase'

describe('Create Rental', () => {
  const dayAdded24Hours = dayjs().add(1, 'day').toDate()

  let createRentalUseCase: CreateRentalUseCase
  let rentalsRepositoryInMemory: RentalsRepositoryInMemory
  let dayjsDateProvider: DayjsDateProvider

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    )
  })

  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '123',
      user_id: '321',
      expected_return_date: dayAdded24Hours,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('Should not be able to create rental for user who has already rented', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '121233',
        user_id: '321',
        expected_return_date: dayAdded24Hours,
      })

      await createRentalUseCase.execute({
        car_id: '123',
        user_id: '321',
        expected_return_date: dayAdded24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a rental for a car already rented', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '123',
        user_id: '123',
        expected_return_date: dayAdded24Hours,
      })

      await createRentalUseCase.execute({
        car_id: '123',
        user_id: '321',
        expected_return_date: dayAdded24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '123',
        user_id: '321',
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
