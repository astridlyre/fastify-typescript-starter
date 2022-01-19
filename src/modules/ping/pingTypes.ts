import { Static, Type } from '@sinclair/typebox'

export const Ping = Type.Object({
  success: Type.Boolean(),
})

export type PingType = Static<typeof Ping>
