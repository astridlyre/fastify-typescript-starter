/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import { FastifyReply, FastifyRequest } from 'fastify'
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
