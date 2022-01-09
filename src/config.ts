export async function loadConfiguration() {
  if (process.env.NODE_ENV === 'production') {
    const config = await import('./config.production.json')
    return config
  }
  const config = await import('./config.development.json')
  return config
}
