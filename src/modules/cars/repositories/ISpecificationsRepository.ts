import { SpecificationType } from '../entities/Specification'

interface ICreateSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<SpecificationType>
  findByName(name: string): Promise<SpecificationType>
}

export { ISpecificationsRepository, ICreateSpecificationDTO }
