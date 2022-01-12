import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { User } from '../entities/User'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(user_id: string): Promise<User>
  update(data: IUpdateUserDTO): Promise<User>
}

export { IUsersRepository }
