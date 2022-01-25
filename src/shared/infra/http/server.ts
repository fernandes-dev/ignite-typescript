import { app } from './app'

const serverPort = process.env.PORT || 3333

app.listen(serverPort, () =>
  // eslint-disable-next-line no-console
  console.log(`🚀 server is running on port: ${serverPort}`)
)
