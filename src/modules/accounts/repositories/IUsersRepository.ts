import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { UserType } from '../entities/User'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<UserType>
  findByEmail(email: string): Promise<UserType>
  findById(user_id: string): Promise<UserType>
  update(data: IUpdateUserDTO): Promise<UserType>
}

export { IUsersRepository }
