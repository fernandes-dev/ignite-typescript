import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from '@modules/cars/repositories/ISpecificationsRepository'

import {
  SpecificationEntity,
  Specification,
  SpecificationType,
} from '../entities/Specification'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: SpecificationEntity

  constructor() {
    this.repository = Specification.instance()
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<SpecificationType> {
    const specification = await this.repository.create({
      data: { name, description },
    })

    return specification
  }

  async findByName(name: string): Promise<SpecificationType> {
    const specification = await this.repository.findFirst({ where: { name } })

    return specification
  }
}

export { SpecificationsRepository }
