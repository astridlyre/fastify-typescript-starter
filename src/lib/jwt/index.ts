import type { FastifyInstance } from 'fastify'
import jwt from 'fastify-jwt'

declare module 'fastify-jwt' {
  interface FastifyJWT {
    payload: { id: number; email: string }
    user: { id: number; email: string }
  }
}

export default async function withJWT(fastify: FastifyInstance): Promise<void> {
  await fastify.register(jwt, { secret: fastify.config.SECRET })
}
