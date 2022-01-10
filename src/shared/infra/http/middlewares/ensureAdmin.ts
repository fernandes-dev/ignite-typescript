import { NextFunction, Request, Response } from 'express'

import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository'
import { AppError } from '@shared/errors/AppError'

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user

  const userRepository = new UsersRepository()

  const user = await userRepository.findById(id)

  if (!user.is_admin) throw new AppError('User is not admin', 401)

  return next()
}
