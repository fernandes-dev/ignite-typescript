import { categories, Prisma, users } from '.prisma/client'

import { database } from '../../../database'

export type UserEntity = Prisma.usersDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>

export type UserType = users

export type CategoryType = categories

class User {
  private users: UserEntity

  constructor() {
    this.users = database.users
  }

  instance(): UserEntity {
    return this.users
  }
}

export { User }
