import 'reflect-metadata'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import 'express-async-errors'

import { router } from './routes/index.routes'
import swaggerFile from './swagger.json'

import './shared/container'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (request, response) => response.json({ message: 'Hello World' }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error)
      return response
        .status(500)
        .json({ error: error instanceof Error ? error.message : error })

    return next()
  }
)

app.listen(3333, () => console.log('Server is Running'))
