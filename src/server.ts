import helmet from 'fastify-helmet'
import cors from 'fastify-cors'
import rateLimit from 'fastify-rate-limit'
// import { db } from './db'
import build from './app'
import { withControllers } from './controllers'

async function main() {
  const server = await build({
    withControllers,
    fastifyOptions: {
      logger: true,
    },
  })

  if (server.config.NODE_ENV === 'production') {
    server.register(helmet)
    server.register(cors)

    await server.register(rateLimit, {
      global: true,
      max: 100,
      timeWindow: '1 minute',
    })

    server.setNotFoundHandler(
      { preHandler: server.rateLimit() },
      (_req, reply) => reply.code(404).send({ error: 'Unknown endpoint' }),
    )
  }

  try {
    server.listen(server.config.PORT ?? 3000, async (err, addr) => {
      if (err) {
        server.log.error(err)
        // await db.$disconnect()
        process.exit(1)
      }
      server.log.info(`Server listening at ${addr}`)
    })
  } catch (err) {
    server.log.error(err)
    // await db.$disconnect()
    process.exit(1)
  }
}

main()
