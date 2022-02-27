/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import type { FastifyRequest, FastifyReply } from 'fastify'

export default async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.code(401).send({
      error: 'Invalid token',
      statusCode: 401,
      message: 'Bearer token is missing or invalid',
    })
  }
}
