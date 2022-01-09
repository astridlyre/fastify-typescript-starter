import { DefaultRegisterControllers as RegisterControllers } from './controllers'
import { build } from './app'
import { loadConfiguration } from './config'

const server = build({
  RegisterControllers,
  fastifyOptions: {
    logger: true,
  },
})

loadConfiguration()
  .then((config) => {
    server.listen(config.PORT, (error, address) => {
      if (error) {
        console.error(error)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
    })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
