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
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const specifications_cars = specifications.map(s => {
      return { specifications_id: s.id }
    })

    const data = {
      name,
      description,
      daily_rate,
      fine_amount,
      brand,
      license_plate,
      category_id,
      id,
    }

    const car = await this.repository.upsert({
      create: {
        ...data,
        specifications_cars: {
          createMany: { data: specifications_cars },
        },
      },
      update: {
        ...data,
        specifications_cars: {
          deleteMany: { car_id: id },
          createMany: { data: specifications_cars },
        },
      },
      where: { id },
    })

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findFirst({ where: { license_plate } })

    return car
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const filter = {
      available: true,
    }

    if (brand) Object.assign(filter, { brand })
    if (category_id) Object.assign(filter, { category_id })
    if (name) Object.assign(filter, { name })

    const cars = await this.repository.findMany({
      where: filter,
    })

    return cars
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.repository.findUnique({ where: { id: car_id } })

    return car
  }
}

export { CarsRepository }
