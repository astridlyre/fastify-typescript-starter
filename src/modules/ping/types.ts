import { Static, Type } from '@sinclair/typebox'

export const PingSchema = Type.Object(
  {
    success: Type.Boolean(),
  },
  {
    description: 'A simple health check.',
    title: 'Ping',
  },
)

export type PingType = Static<typeof PingSchema>
