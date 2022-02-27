import type { FastifyServerOptions } from 'fastify'
import fastify from 'fastify'
import type { RegisterControllersType } from './controllers'
import withConfig from '~/lib/config'
import withJWT from '~/lib/jwt'

type BuildType = {
  withControllers: RegisterControllersType
  fastifyOptions: FastifyServerOptions
}

export default async function build({
  withControllers,
  fastifyOptions,
}: BuildType) {
  const app = fastify(fastifyOptions)

  await withConfig(app)
  await withJWT(app)
  withControllers(app)

  return app
}
