#!/bin/sh

echo "🚀 Iniciando configuración de la base de datos..."

# Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté disponible..."
until pg_isready -h postgres -U postgres -d fullstack_app; do
  echo "Esperando PostgreSQL..."
  sleep 2
done

echo "✅ PostgreSQL está listo!"

# Generar el cliente de Prisma
echo "🔧 Generando cliente de Prisma..."
npx prisma generate

# Ejecutar migraciones
echo "📊 Ejecutando migraciones..."
npx prisma migrate deploy

# Ejecutar seed
echo "🌱 Poblando base de datos..."
npx prisma db seed

echo "✅ Base de datos configurada correctamente!"

# Iniciar la aplicación
echo "🚀 Iniciando aplicación..."
npm run dev 