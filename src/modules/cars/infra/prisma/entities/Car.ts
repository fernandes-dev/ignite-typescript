/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidV4 } from 'uuid'

import { database } from '@shared/infra/prisma/databaseConnection'

import { Prisma } from '.prisma/client'

export type CarEntity = Prisma.carsDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>

class Car {
  private static cars: CarEntity

  id: string

  name: string

  description: string

  daily_rate: number

  license_plate: string

  fine_amount: number

  brand: string

  category_id: string

  available: boolean

  created_at: Date

  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
      this.available = true
      this.created_at = new Date()
      this.updated_at = new Date()
    }
  }

  static instance(): CarEntity {
    if (!this.cars) this.cars = database.cars

    return this.cars
  }
}

export { Car }
