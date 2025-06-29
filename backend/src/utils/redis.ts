import { createClient } from 'redis'

let redisClient: ReturnType<typeof createClient> | null = null

export async function connectRedis() {
  if (!process.env['REDIS_URL']) {
    throw new Error('REDIS_URL no está definida en el entorno')
  }
  if (!redisClient) {
    redisClient = createClient({ url: process.env['REDIS_URL'] })
    redisClient.on('error', (err) => {
      console.error('Redis Client Error', err)
    })
    await redisClient.connect()
    console.log('✅ Conectado a Redis')
  }
  return redisClient
}

export { redisClient } 