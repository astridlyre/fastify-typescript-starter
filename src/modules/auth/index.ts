import type { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify'
import * as E from '~/lib/errors'
import * as T from './types'
import * as S from './service'

function validateCredentials(credentials: T.CredentialsType) {
  if (!credentials.email || !credentials.password) {
    throw new E.ServerError(
      'Invalid credentials',
      'Credentials must include email (string) and password (string)',
      E.ServerError.unprocessable,
    )
  }
}

function validateCredentialsWithUsername(
  credentials: T.CredentialsWithUsernameType,
) {
  if (!credentials.email || !credentials.password) {
    throw new E.ServerError(
      'Invalid credentials',
      'Credentials must include email (string) and password (string)',
      E.ServerError.unprocessable,
    )
  }
}

export const postLoginUser = {
  method: 'POST' as const,
  url: '/login',
  schema: {
    description: 'Login with user credentials and receive a token',
    tags: ['auth'],
    summary: 'Log in with credentials',
    body: T.CredentialsSchema,
    response: {
      200: T.UserSchema,
      401: E.ErrorSchema,
      404: E.ErrorSchema,
      500: E.ErrorSchema,
    },
  },
  handler: async (
    request: FastifyRequest & { body: T.CredentialsType },
    reply: FastifyReply,
  ) => {
    try {
      const credentials = request.body

      validateCredentials(credentials)

      const user = await S.loginUser(credentials)
      const token = await reply.jwtSign({ email: user.email, id: user.id })

      return { ...user, token }
    } catch (err) {
      return E.errorReply(err as E.ServerError, reply)
    }
  },
}

export const postRegisterUser = {
  method: 'POST' as const,
  url: '/register',
  schema: {
    description:
      'Register a new user, returns the created user along with a token',
    tags: ['auth'],
    summary: 'Register a new user',
    body: T.CredentialsSchemaWithUsername,
    response: {
      201: T.UserSchema,
      422: E.ErrorSchema,
      500: E.ErrorSchema,
    },
  },
  handler: async (
    request: FastifyRequest & { body: T.CredentialsWithUsernameType },
    reply: FastifyReply,
  ) => {
    try {
      const credentials = request.body

      validateCredentialsWithUsername(credentials)

      const user = await S.registerUser(credentials)
      const token = await reply.jwtSign({ email: user.email, id: user.id })

      return await reply.code(201).send({ ...user, token })
    } catch (err) {
      return E.errorReply(err as E.ServerError, reply)
    }
  },
}

export default function AuthController(fastify: FastifyInstance) {
  fastify.route<{ Body: T.CredentialsType }>(postLoginUser)
  fastify.route<{ Body: T.CredentialsWithUsernameType }>(postRegisterUser)
}
