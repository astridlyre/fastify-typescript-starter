/* eslint-disable no-unused-vars */
import type { FastifyInstance, FastifyPluginCallback } from 'fastify'
import modules from './modules'

export type RegisterControllersType = (fastify: FastifyInstance) => void

export type ControllerType = {
  controller: FastifyPluginCallback
  prefix: string
  env: string
}

export function createRegisterControllers(controllers: ControllerType[]) {
  return function registerControllers(fastify: FastifyInstance) {
    controllers.forEach(({ controller, prefix }) => {
      fastify.register(controller, { prefix: `/api${prefix}` })
    })
  }
}

export const withControllers = createRegisterControllers(Object.values(modules))
