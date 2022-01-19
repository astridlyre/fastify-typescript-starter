/* eslint-disable no-unused-vars */
import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import * as modules from './modules'

export type IRegisterControllers = (server: FastifyInstance) => void

export interface IController {
  controller: FastifyPluginCallback
  prefix: string
  env: string
}

/*
 * createRegisterControllers creates a register function which takes an instance
 * of a Fastify server and loads the IController modules as routes.
 */
export function createRegisterControllers(controllers: IController[]) {
  return function registerControllers(server: FastifyInstance) {
    controllers.forEach(({ controller, prefix }) =>
      server.register(controller, { prefix: `/api/v1${prefix}` }),
    )
  }
}

export const DefaultRegisterControllers = createRegisterControllers(
  Object.values(modules),
)
