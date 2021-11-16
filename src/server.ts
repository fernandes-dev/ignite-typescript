import 'reflect-metadata'
import cors from 'cors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { router } from './routes'
import swaggerFile from './swagger.json'

import './shared/container'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (request, response) => response.json({ message: 'Hello World' }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.listen(3333, () => console.log('Server is Running'))
