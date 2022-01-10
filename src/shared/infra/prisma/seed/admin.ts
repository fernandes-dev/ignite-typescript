import { makeHash } from '@shared/infra/bcrypt'

import { database } from '../databaseConnection'

async function create() {
  const hashedPassowrd = await makeHash('1234')

  await database.users.create({
    data: {
      email: 'admin@admin.com',
      name: 'Admin',
      password: hashedPassowrd,
      is_admin: true,
      driver_license: '123',
    },
  })
}

// eslint-disable-next-line no-console
create().then(() => console.log('User admin created'))
