/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidV4 } from 'uuid'

import { Specification } from './Specification'

class Car {
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

  specifications?: Specification[]

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
      this.available = true
      this.created_at = new Date()
      this.updated_at = new Date()
    }
  }
}

export { Car }
