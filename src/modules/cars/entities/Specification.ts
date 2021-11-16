import { Prisma, PrismaClient, specifications } from '.prisma/client'

export type SpecificationEntity = Prisma.specificationsDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>

export type SpecificationType = specifications
class Specification {
  private specifications: SpecificationEntity

  constructor() {
    const prisma = new PrismaClient()

    this.specifications = prisma.specifications
  }

  instance(): SpecificationEntity {
    return this.specifications
  }
}

export { Specification }
