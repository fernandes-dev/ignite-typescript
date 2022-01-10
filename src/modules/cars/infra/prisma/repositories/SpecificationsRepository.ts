import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from '@modules/cars/repositories/ISpecificationsRepository'

import { SpecificationEntity, Specification } from '../entities/Specification'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: SpecificationEntity

  constructor() {
    this.repository = Specification.instance()
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = await this.repository.create({
      data: { name, description },
    })

    return specification
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findFirst({ where: { name } })

    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findMany({
      where: {
        id: { in: ids },
      },
    })

    return specifications
  }
}

export { SpecificationsRepository }
