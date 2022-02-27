import type { FastifyInstance } from 'fastify'
import fastifyEnv from 'fastify-env'

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  interface FastifyInstance {
    config: {
      PORT: string
      DATABASE_URL: string
      SECRET: string
      NODE_ENV: 'production' | 'development' | 'test'
    }
  }
}

const schema = {
  type: 'object',
  properties: {
    PORT: { type: 'string', default: '3000' },
    DATABASE_URL: { type: 'string' },
    SECRET: { type: 'string' },
    NODE_ENV: {
      enum: ['production', 'development', 'test'],
      default: 'production',
    },
  },
  required: ['PORT', 'DATABASE_URL', 'SECRET', 'NODE_ENV'],
}

const options = { dotenv: true, schema }

export default async function withConfig(
  fastify: FastifyInstance,
): Promise<void> {
  await fastify.register(fastifyEnv, options)
}
