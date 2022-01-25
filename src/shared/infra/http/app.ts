import 'reflect-metadata'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import 'express-async-errors'

import '@shared/container'
import { AppError } from '@shared/errors/AppError'

import swaggerFile from '../../../swagger.json'
import { router } from './routes/routes'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (request, response) => response.json({ message: 'Hello World' }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: unknown, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError)
      return response.status(error.statusCode).json({ error: error.message })

    return response.status(500).json({
      error:
        error instanceof Error
          ? `Internal server error - ${error.message}`
          : error,
    })
  }
)

export { app }
