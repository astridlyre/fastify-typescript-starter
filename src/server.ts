import { DefaultRegisterControllers as RegisterControllers } from './controllers'
import { default as helmet } from 'fastify-helmet'
import { default as cors } from 'fastify-cors'
import { default as rateLimit } from 'fastify-rate-limit'
import { build } from './app'
import { loadConfiguration } from './config'
import type { ENV } from './config'
;(async function main() {
  const env = (process.env.NODE_ENV ?? 'production') as ENV
  const server = build({
    RegisterControllers,
    fastifyOptions: {
      logger: true,
    },
  })

  /*
   * Security specific plugins for production
   */
  if (env === 'production') {
    // Helmet
    server.register(helmet)

    // CORS
    server.register(cors)

    // Rate Limiting
    await server.register(rateLimit, {
      global: true,
      max: 100,
      timeWindow: '1 minute',
    })

    // Set default 404 Handler to restrict guessing of 404s
    server.setNotFoundHandler(
      { preHandler: server.rateLimit() },
      function (_request, reply) {
        reply.code(404).send({ error: 'Unknown Endpoint' })
      },
    )
  }

  // Load configuration
  const config = await loadConfiguration(env)

  // Start the server
  try {
    server.listen(config.PORT ?? 3000, (error, address) => {
      if (error) {
        console.error(error)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
