import { AppError } from '../../../../errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

describe('Authenticate user', () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory
  let authenticateUserUseCase: AuthenticateUserUseCase

  let createUserUseCase: CreateUserUseCase

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'Eduardo Fernandes',
      email: 'fernandes.eduardo@unemat.br',
      password: '1234',
      driver_license: '1234',
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'fernandes.eduardo@unemat.br',
        password: '1234',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate an user with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'Eduardo Fernandes',
        email: 'fernandes.eduardo@unemat.br',
        password: '1234',
        driver_license: '1234',
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'invalid_password',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
