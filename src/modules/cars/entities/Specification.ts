import { Prisma, specifications } from '.prisma/client'

import { database } from '../../../database'

export type SpecificationEntity = Prisma.specificationsDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>

export type SpecificationType = specifications
class Specification {
  private specifications: SpecificationEntity

  constructor() {
    this.specifications = database.specifications
  }

  instance(): SpecificationEntity {
    return this.specifications
  }
}

export { Specification }
