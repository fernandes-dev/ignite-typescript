import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { UserType } from '../entities/User'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<UserType>
  findByEmail(email: string): Promise<UserType>
}

export { IUsersRepository }
