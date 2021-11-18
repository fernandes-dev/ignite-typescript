import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO'
import { User, UserType } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  users: UserType[] = []

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<UserType> {
    const user = new User()

    Object.assign(user, { name, email, password, driver_license })

    this.users.push(user)

    return user
  }
  async findByEmail(email: string): Promise<UserType> {
    return this.users.find(u => u.email === email)
  }
  async findById(user_id: string): Promise<UserType> {
    return this.users.find(u => u.id === user_id)
  }
  async update(data: IUpdateUserDTO): Promise<UserType> {
    const userIndex = this.users.findIndex(u => u.id === data.user_id)

    const user = { ...this.users[userIndex] }

    Object.assign(user, { id: user.id, ...data })

    this.users[userIndex] = user

    return user
  }
}

export { UsersRepositoryInMemory }
