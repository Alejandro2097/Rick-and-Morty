@echo off
echo 🛠️ Solucionando problemas comunes en Windows
echo ============================================
echo.

echo 🛑 Deteniendo servicios existentes...
docker-compose down 2>nul
echo ✅ Servicios detenidos

echo.
echo 📋 Verificando archivos de configuración...

if not exist "backend\.env" (
    echo 📝 Creando backend\.env...
    copy backend\env.example backend\.env
    echo ✅ backend\.env creado
) else (
    echo ✅ backend\.env ya existe
)

if not exist "frontend\.env" (
    echo 📝 Creando frontend\.env...
    copy frontend\env.example frontend\.env
    echo ✅ frontend\.env creado
) else (
    echo ✅ frontend\.env ya existe
)

echo.
echo 🧹 Limpiando volúmenes Docker...
docker volume prune -f 2>nul
echo ✅ Volúmenes limpiados

echo.
echo 🚀 Iniciando servicios...
docker-compose up -d

echo.
echo ⏳ Esperando a que los servicios estén listos...
timeout /t 30 /nobreak >nul

echo.
echo 🔍 Verificando estado de los servicios...
docker-compose ps

echo.
echo 📊 Verificando base de datos...
docker-compose exec -T backend npx prisma db seed 2>nul
if errorlevel 1 (
    echo ⚠️ No se pudo poblar la base de datos automáticamente
    echo 💡 Ejecuta manualmente: docker-compose exec backend npx prisma db seed
) else (
    echo ✅ Base de datos poblada
)

echo.
echo 🎉 ¡Configuración completada!
echo.
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:4000
echo 📚 GraphQL: http://localhost:4000/graphql
echo.
echo 💡 Si los personajes no aparecen, revisa la consola del navegador (F12)
echo.
pause 