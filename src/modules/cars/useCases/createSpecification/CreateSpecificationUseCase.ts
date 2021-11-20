import { inject, injectable } from 'tsyringe'

import { Specification } from '@modules/cars/infra/prisma/entities/Specification'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const existentSpecification =
      await this.specificationsRepository.findByName(name)

    if (existentSpecification)
      throw new AppError('Specification already exists')

    const specification = await this.specificationsRepository.create({
      name,
      description,
    })

    return specification
  }
}

export { CreateSpecificationUseCase }
