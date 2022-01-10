import { hash } from 'bcrypt'

const makeHash = (text: string): Promise<string> => {
  const hashedText = hash(text, 8)

  return hashedText
}

export { makeHash }
