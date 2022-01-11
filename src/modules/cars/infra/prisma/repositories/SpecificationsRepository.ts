import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from '@modules/cars/repositories/ISpecificationsRepository'
import { Prisma } from '@prisma/client'
import { database } from '@shared/infra/prisma/databaseConnection'

import { Specification } from '../entities/Specification'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Prisma.specificationsDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >
  constructor() {
    this.repository = database.specifications
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
