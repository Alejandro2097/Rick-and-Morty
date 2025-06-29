#!/bin/sh

echo "🔍 Verificando estado de la base de datos..."

# Verificar conexión a PostgreSQL
if ! pg_isready -h postgres -U postgres -d fullstack_app; then
    echo "❌ PostgreSQL no está disponible"
    exit 1
fi

echo "✅ PostgreSQL está disponible"

# Verificar si existen datos
COUNT=$(npx prisma db execute --stdin <<< "SELECT COUNT(*) as count FROM characters;" 2>/dev/null | grep -o '[0-9]*' | tail -1)

if [ "$COUNT" = "0" ] || [ -z "$COUNT" ]; then
    echo "📊 Base de datos vacía, poblando..."
    npx prisma db seed
    echo "✅ Base de datos poblada"
else
    echo "📊 Base de datos tiene $COUNT personajes"
    echo "💡 Para repoblar: npx prisma db seed"
fi

echo "🎉 Verificación completada" 