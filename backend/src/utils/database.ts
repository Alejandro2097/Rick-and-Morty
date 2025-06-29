import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

export const connectDatabase = async () => {
  try {
    prisma = new PrismaClient()
    await prisma.$connect()
    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  }
}

export const getPrismaClient = () => {
  if (!prisma) {
    throw new Error('Database not connected. Call connectDatabase() first.')
  }
  return prisma
}

export const disconnectDatabase = async () => {
  if (prisma) {
    await prisma.$disconnect()
    console.log('🔌 Database disconnected')
  }
} 