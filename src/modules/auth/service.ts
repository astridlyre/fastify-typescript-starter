import argon2 from 'argon2'
import { db } from '~/lib/db'
import * as T from './types'
import * as E from '~/lib/errors'

export async function loginUser(
  credentials: T.CredentialsType,
): Promise<T.UserType | never> {
  const user = await db.user.findUnique({
    where: { email: credentials.email },
  })

  if (!user) {
    throw new E.ServerError(
      'Invalid email',
      `No user with email ${credentials.email} found in database`,
      E.ServerError.notFound,
    )
  }

  const isValid = await argon2.verify(user.passwordHash, credentials.password)

  if (!isValid) {
    throw new E.ServerError(
      'Invalid password',
      `Password provided does not match stored password`,
      E.ServerError.unauthorized,
    )
  }

  return user
}

export async function registerUser(
  credentials: T.CredentialsType & { username: string },
): Promise<T.UserType | never> {
  const user = await db.user.findUnique({
    where: { email: credentials.email },
  })

  if (user) {
    throw new E.ServerError(
      'Invalid user',
      `A user with email ${credentials.email} already exists`,
      E.ServerError.unprocessable,
    )
  }

  const passwordHash = await argon2.hash(credentials.password)
  const newUser = await db.user.create({
    data: {
      username: credentials.username,
      email: credentials.email,
      passwordHash,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  })

  if (!newUser) {
    throw new E.ServerError(
      'Database error',
      'Unable to create user in database',
      E.ServerError.internalError,
    )
  }

  return newUser
}
