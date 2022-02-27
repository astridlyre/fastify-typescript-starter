import { Static, Type } from '@sinclair/typebox'

export const CredentialsSchema = Type.Object(
  {
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6, maxLength: 128 }),
  },
  {
    description: 'Login credentials include an email and password',
    title: 'Login credentials',
  },
)

export type CredentialsType = Static<typeof CredentialsSchema>

export const CredentialsSchemaWithUsername = Type.Intersect([
  CredentialsSchema,
  Type.Object({
    username: Type.String(),
  }),
])

export type CredentialsWithUsernameType = Static<
  typeof CredentialsSchemaWithUsername
>

export const UserSchema = Type.Object(
  {
    id: Type.Number(),
    email: Type.String(),
    token: Type.Optional(Type.String()),
  },
  {
    description:
      'A logged-in User, with basic user information and authorization token.',
    title: 'Logged-in User',
  },
)

export type UserType = Static<typeof UserSchema>
