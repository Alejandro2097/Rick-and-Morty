#!/bin/bash

echo "🐳 Iniciando backend con Docker..."

# Verificar si Docker está ejecutándose
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker no está ejecutándose. Por favor, inicia Docker primero."
    exit 1
fi

# Detener contenedores existentes si los hay
echo "🛑 Deteniendo contenedores existentes..."
docker-compose down

# Construir y ejecutar solo la base de datos
echo "🚀 Iniciando PostgreSQL y Redis..."
docker-compose up postgres redis -d

# Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté disponible..."
until docker-compose exec -T postgres pg_isready -U postgres -d fullstack_app; do
    sleep 2
done

echo "✅ PostgreSQL está listo!"

# Ejecutar migraciones y seed
echo "🔧 Configurando base de datos..."
docker-compose run --rm backend sh -c "
    npx prisma generate &&
    npx prisma migrate deploy &&
    npx prisma db seed
"

echo "✅ Base de datos configurada!"

# Iniciar el backend
echo "🚀 Iniciando backend..."
docker-compose up backend

echo "🎉 Backend ejecutándose en http://localhost:4000" 