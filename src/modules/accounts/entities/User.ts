import { v4 as uuidV4 } from 'uuid'

import { Prisma, users } from '.prisma/client'

import { database } from '../../../database'

export type UserEntity = Prisma.usersDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>

export type UserType = users

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
    return {
      id: uuidV4(),
      name: this.name,
      email: this.email,
      password: this.password,
      avatar: this.avatar,
      driver_license: this.driver_license,
      is_admin: this.is_admin,
      created_at: new Date(),
    }
  }

  static instance(): UserEntity {
    if (this.users) this.users = database.users

    return this.users
  }
}

export { User }
