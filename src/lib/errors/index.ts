import type { FastifyReply } from 'fastify'
import { Type, Static } from '@sinclair/typebox'

type StatusCodes = 401 | 403 | 404 | 422 | 500

export class ServerError extends Error {
  statusCode: StatusCodes

  name: string

  constructor(name: string, message: string, statusCode: StatusCodes) {
    super(message)
    this.statusCode = statusCode
    this.name = name
    Error.captureStackTrace(this)
  }

  static unauthorized: StatusCodes = 401

  static forbidden: StatusCodes = 403

  static notFound: StatusCodes = 404

  static unprocessable: StatusCodes = 422

  static internalError: StatusCodes = 500
}

export function errorReply(err: ServerError, reply: FastifyReply) {
  return reply.code(err.statusCode ?? ServerError.internalError).send({
    error: err.name ?? 'Internal error',
    statusCode: err.statusCode,
    message:
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong'
        : err.message,
  })
}

export const ErrorSchema = Type.Object(
  {
    name: Type.String(),
    message: Type.String(),
    statusCode: Type.Number(),
  },
  {
    description: 'Unsuccessful response: An Error',
    title: 'Error',
  },
)

export type ErrorType = Static<typeof ErrorSchema>
