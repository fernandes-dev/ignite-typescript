import fs from 'fs'

export async function deleteFile(fileName: string): Promise<void> {
  try {
    await fs.promises.stat(fileName)
  } catch (error) {
    return
  }

  await fs.promises.unlink(fileName)
}
