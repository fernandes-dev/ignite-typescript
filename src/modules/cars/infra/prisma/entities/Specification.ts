import { v4 as uuidV4 } from 'uuid'

import { database } from '@shared/infra/prisma/databaseConnection'

import { Prisma, specifications } from '.prisma/client'

export type SpecificationEntity = Prisma.specificationsDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>

export type SpecificationType = specifications
class Specification {
  private static specifications: SpecificationEntity

  id: string

  name: string

  description: string

  created_at: Date

  constructor() {
    return {
      id: uuidV4(),
      name: this.name,
      description: this.description,
      created_at: new Date(),
    }
  }

  static instance(): SpecificationEntity {
    if (!this.specifications) this.specifications = database.specifications

    return this.specifications
  }
}

export { Specification }
