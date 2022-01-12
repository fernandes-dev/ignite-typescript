import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { Rental } from '@modules/rentals/entities/Rental'

import { IRentalsRepository } from '../IRentalsRepository'

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(r => r.car_id === car_id && !r.end_date)

    return rental
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(r => r.user_id === user_id && !r.end_date)

    return rental
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
    })

    this.rentals.push(rental)

    return rental
  }
}

export { RentalsRepositoryInMemory }
