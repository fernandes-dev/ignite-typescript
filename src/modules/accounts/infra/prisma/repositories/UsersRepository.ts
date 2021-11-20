import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '@modules/accounts/dtos/IUpdateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { UserEntity, User } from '../entities/User'

class UsersRepository implements IUsersRepository {
  private repository: UserEntity

  constructor() {
    this.repository = User.instance()
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.repository.create({
      data: { name, email, password, driver_license },
    })

    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findFirst({ where: { email } })

    return user
  }

  async findById(user_id: string): Promise<User> {
    const user = await this.repository.findUnique({ where: { id: user_id } })

    return user
  }

  async update({
    user_id,
    name,
    email,
    password,
    avatar,
    driver_license,
    is_admin,
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.repository.update({
      data: {
        name,
        email,
        password,
        avatar,
        driver_license,
        is_admin,
      },
      where: { id: user_id },
    })

    return user
  }
}

export { UsersRepository }
