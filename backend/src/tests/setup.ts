import { PrismaClient } from '@prisma/client'
import { connectDatabase, disconnectDatabase } from '../utils/database.js'
import { connectRedis, disconnectRedis } from '../utils/redis.js'

// Global test setup
beforeAll(async () => {
  // Connect to test database and Redis
  await connectDatabase()
  await connectRedis()
})

// Global test teardown
afterAll(async () => {
  // Disconnect from database and Redis
  await disconnectDatabase()
  await disconnectRedis()
})

// Mock environment variables for testing
process.env.JWT_SECRET = 'test-secret-key'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db'
process.env.REDIS_URL = 'redis://localhost:6379'
process.env.NODE_ENV = 'test' 