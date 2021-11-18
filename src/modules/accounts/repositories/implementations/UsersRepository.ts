import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO'
import { User, UserEntity, UserType } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

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
  }: ICreateUserDTO): Promise<UserType> {
    const user = await this.repository.create({
      data: { name, email, password, driver_license },
    })

    return user
  }

  async findByEmail(email: string): Promise<UserType> {
    const user = await this.repository.findFirst({ where: { email } })

    return user
  }

  async findById(user_id: string): Promise<UserType> {
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
  }: IUpdateUserDTO): Promise<UserType> {
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
