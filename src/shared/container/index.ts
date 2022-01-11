import { container } from 'tsyringe'

import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository'
import { CarImagesRepository } from '@modules/cars/infra/prisma/repositories/CarImagesRepository'
import { CarsRepository } from '@modules/cars/infra/prisma/repositories/CarsRepository'
import { CategoriesRepository } from '@modules/cars/infra/prisma/repositories/CategoriesRepository'
import { SpecificationsRepository } from '@modules/cars/infra/prisma/repositories/SpecificationsRepository'
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<ICarImagesRepository>(
  'CarImagesRepository',
  CarImagesRepository
)
