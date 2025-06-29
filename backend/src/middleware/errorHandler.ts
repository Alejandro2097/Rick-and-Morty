import { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  statusCode?: number
  code?: string
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error)

  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal Server Error'
  const code = error.code || 'INTERNAL_SERVER_ERROR'

  res.status(statusCode).json({
    error: {
      message,
      code,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    },
  })
}

export const createError = (message: string, statusCode: number = 500, code?: string): AppError => {
  const error = new Error(message) as AppError
  error.statusCode = statusCode
  error.code = code
  return error
} 