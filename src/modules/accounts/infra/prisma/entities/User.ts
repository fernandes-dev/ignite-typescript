import { v4 as uuidV4 } from 'uuid'

import { database } from '@shared/infra/prisma/databaseConnection'

import { Prisma } from '.prisma/client'

export type UserEntity = Prisma.usersDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>

class User {
  private static users: UserEntity

  id: string
  name: string
  email: string
  password: string
  avatar: string
  driver_license: string
  is_admin: boolean
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
      this.created_at = new Date()
    }
  }

  static instance(): UserEntity {
    if (!this.users) this.users = database.users

    return this.users
  }
}

export { User }
