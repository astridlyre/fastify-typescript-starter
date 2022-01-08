import { DefaultRegisterControllers as RegisterControllers } from './controllers'
import { build } from './app'
import { PORT } from './config.json'

const server = build({
  RegisterControllers,
  fastifyOptions: {
    logger: true,
  },
})

server.listen(PORT, (error, address) => {
  if (error) {
    console.error(error)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
