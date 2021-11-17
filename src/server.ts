import 'reflect-metadata'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import 'express-async-errors'

import { router } from './routes/routes'
import swaggerFile from './swagger.json'

import './shared/container'
import { AppError } from './errors/AppError'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (request, response) => response.json({ message: 'Hello World' }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use(
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

app.listen(3333, () => console.log('Server is Running'))
