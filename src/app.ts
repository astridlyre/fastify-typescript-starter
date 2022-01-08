import { default as Fastify, FastifyServerOptions } from 'fastify'
import { IRegisterControllers } from './controllers'

interface IBuildOptions {
  RegisterControllers: IRegisterControllers
  fastifyOptions: FastifyServerOptions
}

export function build({ RegisterControllers, fastifyOptions }: IBuildOptions) {
  const app = Fastify(fastifyOptions)

  RegisterControllers(app)

  return app
}
