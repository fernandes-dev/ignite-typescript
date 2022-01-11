import { CarImage } from '../infra/prisma/entities/CarImage'

interface ICarImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>
}

export { ICarImagesRepository }
