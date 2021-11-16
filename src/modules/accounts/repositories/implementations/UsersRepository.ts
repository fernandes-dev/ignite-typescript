import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User, UserEntity, UserType } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepository implements IUsersRepository {
  private repository: UserEntity

  constructor() {
    this.repository = new User().instance()
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
}

export { UsersRepository }
