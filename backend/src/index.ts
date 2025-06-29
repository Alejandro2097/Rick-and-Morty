import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import dotenv from 'dotenv'
import { typeDefs } from './graphql/schema.js'
import { resolvers } from './graphql/resolvers.js'
import { connectDatabase } from './utils/database.js'
import { connectRedis } from './utils/redis.js'
import { errorHandler } from './middleware/errorHandler.js'
import { rateLimiter } from './middleware/rateLimiter.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env['PORT'] || 4000

// Security middleware
app.use(helmet())

// CORS configuration for Windows compatibility
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env['FRONTEND_URL']
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

// Logging middleware
app.use(morgan('combined'))

// Compression middleware
app.use(compression())

// Rate limiting
app.use(rateLimiter)

// Body parsing middleware
app.use(json({ limit: '10mb' }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error('GraphQL Error:', error)
    return {
      message: error.message,
      code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
    }
  },
})

// Start server
async function startServer() {
  try {
    // Connect to database
    await connectDatabase()
    
    // Connect to Redis
    await connectRedis()
    
    // Start Apollo Server
    await server.start()
    
    // Apply Apollo middleware
    app.use('/graphql', expressMiddleware(server, {
      context: async ({ req }) => {
        // Add authentication context here
        return {
          req,
          user: null, // Will be set by auth middleware
        }
      },
    }))
    
    // Error handling middleware
    app.use(errorHandler)
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`)
      console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`)
      console.log(`🏥 Health check: http://localhost:${PORT}/health`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  process.exit(0)
}) 