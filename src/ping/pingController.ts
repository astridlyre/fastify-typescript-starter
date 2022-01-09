/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import { Ping, PingType } from './pingTypes'

export const getPing = {
  method: 'GET' as const,
  url: '/',
  schema: {
    response: {
      200: Ping,
    },
  },
  handler: async function pingControllerGET(
    _request: FastifyRequest,
    _reply: FastifyReply,
  ) {
    const response: PingType = { success: true }
    return response
  },
}

export const PingController = {
  controller: <Options extends FastifyPluginOptions = Record<never, never>>(
    fastify: FastifyInstance,
    _opts: Options,
    done: (err?: Error) => void,
  ) => {
    fastify.route(getPing)
    done()
  },
  prefix: '/ping',
}
