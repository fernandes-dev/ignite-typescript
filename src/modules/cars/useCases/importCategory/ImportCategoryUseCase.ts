import csvParse from 'csv-parse'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IImportedCategory {
  name: string
  description: string
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportedCategory[]> {
    return new Promise((resolve, reject): void => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportedCategory[] = []

      const parsedFile = csvParse()

      stream.pipe(parsedFile)

      parsedFile
        .on('data', async line => {
          const [name, description] = line

          categories.push({ name, description })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', err => reject(err))
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async category => {
      const { name, description } = category

      const existCategory = await this.categoriesRepository.findByName(name)

      if (!existCategory) {
        this.categoriesRepository.create({ name, description })
      }
    })
  }
}

export { ImportCategoryUseCase }
