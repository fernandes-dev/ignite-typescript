import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { Car, CarEntity } from '../entities/Car'

class CarsRepository implements ICarsRepository {
  private repository: CarEntity

  constructor() {
    this.repository = Car.instance()
  }

  async create({
    name,
    description,
    daily_rate,
    fine_amount,
    brand,
    license_plate,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = await this.repository.create({
      data: {
        name,
        description,
        daily_rate,
        fine_amount,
        brand,
        license_plate,
        category_id,
      },
    })

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findFirst({ where: { license_plate } })

    return car
  }
}

export { CarsRepository }
