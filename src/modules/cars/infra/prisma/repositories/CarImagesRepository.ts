import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'
import { Prisma } from '@prisma/client'
import { database } from '@shared/infra/prisma/databaseConnection'

import { CarImage } from '../entities/CarImage'

class CarImagesRepository implements ICarImagesRepository {
  private repository: Prisma.car_imagesDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >

  constructor() {
    this.repository = database.car_images
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = await this.repository.create({
      data: {
        image_name,
        car_id,
      },
    })

    return carImage
  }
}

export { CarImagesRepository }
