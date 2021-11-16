import {
  Specification,
  SpecificationEntity,
  SpecificationType,
} from '../../entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: SpecificationEntity

  constructor() {
    this.repository = new Specification().instance()
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
