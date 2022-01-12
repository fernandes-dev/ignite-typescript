import { ICreateCarDTO } from '../dtos/ICreateCarDTO'
import { Car } from '../entities/Car'

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>
  findById(car_id: string): Promise<Car>
}

export { ICarsRepository }
