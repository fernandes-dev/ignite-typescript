import request from 'supertest'

import { makeHash } from '@shared/infra/bcrypt'
import { app } from '@shared/infra/http/app'
import { database } from '@shared/infra/prisma/databaseConnection'

describe('List Categories Controller', () => {
  const db = database

  beforeAll(async () => {
    const hashedPassowrd = await makeHash('1234')

    await db.users.create({
      data: {
        email: 'admin@admin.com',
        name: 'Admin',
        password: hashedPassowrd,
        is_admin: true,
        driver_license: '123',
      },
    })
  })

  afterAll(async () => {
    const tablenames = await db.$queryRaw<
      Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

    for (const { tablename } of tablenames) {
      if (tablename !== '_prisma_migrations') {
        await db.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
        )
      }
    }
  })

  it(' should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@admin.com',
      password: '1234',
    })

    const { token } = responseToken.body

    const category = { name: 'Teste', description: 'Descrição teste' }

    await request(app)
      .post('/categories')
      .send(category)
      .set({ Authorization: `Bearer ${token}` })

    const response = await request(app).get('/categories')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].name).toBe(category.name)
  })
})
