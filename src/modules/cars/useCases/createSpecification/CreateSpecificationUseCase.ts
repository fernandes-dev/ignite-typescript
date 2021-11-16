import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/AppError'
import { SpecificationType } from '../../entities/Specification'
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

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

  async execute({ name, description }: IRequest): Promise<SpecificationType> {
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
