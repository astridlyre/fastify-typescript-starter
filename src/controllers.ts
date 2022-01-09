/* eslint-disable no-unused-vars */
import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import { PingController } from './ping/pingController'

export type IRegisterControllers = (server: FastifyInstance) => void

export interface IController {
  controller: FastifyPluginCallback
  prefix: string
}

export function createRegisterControllers(...controllers: IController[]) {
  return function registerControllers(server: FastifyInstance) {
    controllers.forEach(({ controller, prefix }) =>
      server.register(controller, { prefix: `/api/v1${prefix}` }),
    )
  }
}

export const DefaultRegisterControllers =
  createRegisterControllers(PingController)
