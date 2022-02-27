/* eslint-disable no-unused-vars */
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import PingController from './ping'
// import AuthController from './auth'

type ControllerConfig = {
  prefix: string
  env: string
}

function createController(
  module: (fastify: FastifyInstance) => void,
  config: ControllerConfig,
) {
  return {
    controller: <Options extends FastifyPluginOptions = Record<never, never>>(
      fastify: FastifyInstance,
      _opts: Options,
      done: (err?: Error) => void,
    ) => {
      module(fastify)
      done()
    },
    prefix: config.prefix,
    env: config.env,
  }
}

/* export const Auth = createController(AuthController, {
  env: 'all',
  prefix: '/auth',
}) */

const modules = {
  ping: createController(PingController, {
    env: 'all',
    prefix: '/ping',
  }),
}

export default modules
