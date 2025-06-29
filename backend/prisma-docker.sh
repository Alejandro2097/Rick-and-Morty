#!/bin/sh

# Guarda el valor original de DATABASE_URL
ORIGINAL_URL=$(grep DATABASE_URL .env)

# Cambia temporalmente la URL para usar el hostname del contenedor
sed -i.bak 's@localhost@fullstack_postgres@g' .env

echo "🚀 Ejecutando Prisma db push desde un contenedor Node.js en la red de Docker..."
docker run --rm -it \
  --network=prueba_fullstack_network \
  -v $(pwd):/app \
  -w /app \
  node:18-bullseye sh -c "npm install && npx prisma db push"

# Restaura la URL original
grep -v DATABASE_URL .env > .env.tmp && echo "$ORIGINAL_URL" >> .env.tmp && mv .env.tmp .env
rm -f .env.bak

echo "✅ Prisma db push ejecutado correctamente desde el contenedor." 