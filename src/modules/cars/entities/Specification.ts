import { Prisma, PrismaClient, specification } from '.prisma/client'

export type SpecificationEntity = Prisma.specificationDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>

export type SpecificationType = specification
class Specification {
  private specification: SpecificationEntity

  constructor() {
    const prisma = new PrismaClient()

    this.specification = prisma.specification
  }

  instance(): SpecificationEntity {
    return this.specification
  }
}

export { Specification }
