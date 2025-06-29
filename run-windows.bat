@echo off
echo 🐳 Iniciando Rick and Morty App con Docker en Windows...
echo.

REM Verificar si Docker está ejecutándose
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker no está ejecutándose. Por favor, inicia Docker Desktop primero.
    pause
    exit /b 1
)

echo ✅ Docker está ejecutándose
echo.

REM Detener contenedores existentes
echo 🛑 Deteniendo contenedores existentes...
docker-compose down

echo.
echo 🚀 Iniciando servicios con Dockerfile optimizado...
echo.

REM Construir y ejecutar con Docker Compose
docker-compose build --no-cache
docker-compose up -d

echo.
echo ⏳ Esperando a que los servicios estén listos...
echo.

REM Esperar un poco para que los servicios se inicien
timeout /t 45 /nobreak >nul

echo.
echo 📊 Estado de los servicios:
docker-compose ps

echo.
echo 📊 Verificando base de datos...
docker-compose exec -T backend npx prisma db seed
if errorlevel 1 (
    echo ⚠️ Esperando un poco más para la base de datos...
    timeout /t 15 /nobreak >nul
    docker-compose exec -T backend npx prisma db seed
)

echo.
echo 🎉 ¡Aplicación iniciada!
echo.
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:4000
echo 📚 GraphQL Playground: http://localhost:4000/graphql
echo.
echo 💡 Para ver los logs: docker-compose logs -f
echo 💡 Para detener: docker-compose down
echo 💡 Para ejecutar frontend: cd frontend && npm run dev
echo.
pause 