import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO'
import { Rental } from '../entities/Rental'

interface IRentalsRepository {
  findOpenRentalByCarId(car_id: string): Promise<Rental>
  findOpenRentalByUserId(user_id: string): Promise<Rental>
  create(data: ICreateRentalDTO): Promise<Rental>
}

export { IRentalsRepository }
