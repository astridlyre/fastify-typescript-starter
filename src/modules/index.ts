/* eslint-disable no-unused-vars */
import type {
  FastifyInstance,
  FastifyPluginOptions,
  RouteOptions,
} from 'fastify'
import * as ping from './ping'

export interface IControllerConfig {
  prefix: string
  env: string
}

/*
 * createController creates a controller object from a modules' exported
 * handlers. Each handler is a Fastify RouteOptions object.
 *
 * @returns an IController
 */
function createController(
  module: { [key: string]: RouteOptions },
  config: IControllerConfig,
) {
  return {
    controller: <Options extends FastifyPluginOptions = Record<never, never>>(
      fastify: FastifyInstance,
      _opts: Options,
      done: (err?: Error) => void,
    ) => {
      for (const handler of Object.values(module)) {
        fastify.route(handler)
      }
      done()
    },
    env: config.env,
    prefix: config.prefix,
  }
}

export const PingModule = createController(ping, {
  env: 'all',
  prefix: '/ping',
})
