import { Request, Response } from 'express'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async hadle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body

      await this.createCategoryUseCase.execute({ name, description })

      return response.status(201).send()
    } catch (error) {
      return response
        .status(400)
        .json({ error: error instanceof Error ? error.message : error })
    }
  }
}

export { CreateCategoryController }
