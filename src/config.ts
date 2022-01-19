/*
 * To add further configuration options, update the ENV_VARS array with
 * environment variables that are important. In addition, update the Config
 * interface.
 */
const ENV_VARS = ['DATABASE_URL', 'PORT', 'SECRET']

export interface Config {
  DATABASE_URL?: string
  PORT?: number
  SECRET?: string
  [key: string]: string | number | undefined
}

const merge = (a: Config, b: Config) => {
  const result = { ...a }

  for (const [key, value] of Object.entries(b)) {
    if (key in result && value != null) {
      result[key] = value
    }
  }
  return result
}

export type ENV = 'production' | 'development' | 'test'

export async function loadConfiguration(env: ENV) {
  const envVars = ENV_VARS.reduce(
    (acc, k) => ((acc[k] = process.env[k]), acc),
    {} as Config,
  )

  if (env === 'production') {
    const { default: config } = await import('./config.production.json')
    return merge(config, envVars)
  }
  const { default: config } = await import('./config.development.json')
  return merge(config, envVars)
}
