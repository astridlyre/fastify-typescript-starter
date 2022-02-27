/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import * as T from './types'

export const getPing = {
  method: 'GET' as const,
  url: '/',
  schema: {
    description: 'A simple Ping route to see if the server is up',
    tags: ['ping'],
    summary: 'Ping the server status',
    response: {
      200: T.PingSchema,
    },
  },
  handler: async (_request: FastifyRequest, _reply: FastifyReply) => {
    const response: T.PingType = { success: true }
    return response
  },
}

export default function PingModule(fastify: FastifyInstance) {
  fastify.route(getPing)
}
