#!/bin/bash

echo "🚀 Ejecutando Backend desde un contenedor Node.js en la red de Docker..."

docker run --rm -it \
  --network prueba_fullstack_network \
  -v $(pwd):/app \
  -w /app \
  -e DATABASE_URL="postgresql://postgres:postgres@fullstack_postgres:5432/fullstack_app" \
  -e REDIS_URL="redis://fullstack_redis:6379" \
  -e JWT_SECRET="your-super-secret-jwt-key-change-this-in-production" \
  -e PORT=4000 \
  -e NODE_ENV=development \
  -e FRONTEND_URL="http://localhost:5173" \
  -p 4000:4000 \
  node:18-bullseye \
  sh -c "npm install && npm run dev" 