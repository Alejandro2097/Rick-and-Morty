@echo off
echo 🔍 Diagnóstico de Rick and Morty App en Windows
echo ================================================
echo.

echo 📋 Verificando prerrequisitos...
echo.

echo Node.js:
node --version
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    echo 💡 Descarga desde: https://nodejs.org/
) else (
    echo ✅ Node.js está instalado
)

echo.
echo npm:
npm --version
if errorlevel 1 (
    echo ❌ npm no está disponible
) else (
    echo ✅ npm está disponible
)

echo.
echo Docker:
docker --version
if errorlevel 1 (
    echo ❌ Docker no está instalado o no está ejecutándose
    echo 💡 Instala Docker Desktop desde: https://www.docker.com/products/docker-desktop/
) else (
    echo ✅ Docker está disponible
)

echo.
echo Docker Compose:
docker-compose --version
if errorlevel 1 (
    echo ❌ Docker Compose no está disponible
) else (
    echo ✅ Docker Compose está disponible
)

echo.
echo ================================================
echo 🔍 Verificando puertos...
echo.

echo Puerto 4000 (Backend):
netstat -ano | findstr :4000
if errorlevel 1 (
    echo ✅ Puerto 4000 está libre
) else (
    echo ⚠️ Puerto 4000 está ocupado
)

echo.
echo Puerto 5173 (Frontend):
netstat -ano | findstr :5173
if errorlevel 1 (
    echo ✅ Puerto 5173 está libre
) else (
    echo ⚠️ Puerto 5173 está ocupado
)

echo.
echo Puerto 5432 (PostgreSQL):
netstat -ano | findstr :5432
if errorlevel 1 (
    echo ✅ Puerto 5432 está libre
) else (
    echo ⚠️ Puerto 5432 está ocupado
)

echo.
echo ================================================
echo 🔍 Verificando archivos de configuración...
echo.

if exist "backend\.env" (
    echo ✅ backend\.env existe
) else (
    echo ❌ backend\.env no existe
    echo 💡 Ejecuta: copy backend\env.example backend\.env
)

if exist "frontend\.env" (
    echo ✅ frontend\.env existe
) else (
    echo ❌ frontend\.env no existe
    echo 💡 Ejecuta: copy frontend\env.example frontend\.env
)

echo.
echo ================================================
echo 🔍 Verificando servicios Docker...
echo.

docker-compose ps
if errorlevel 1 (
    echo ❌ No se pueden ver los servicios Docker
    echo 💡 Asegúrate de que Docker Desktop esté ejecutándose
) else (
    echo ✅ Servicios Docker verificados
)

echo.
echo ================================================
echo 🎯 Próximos pasos recomendados:
echo.
echo 1. Si Docker no está ejecutándose, inicia Docker Desktop
echo 2. Si faltan archivos .env, cópialos desde los ejemplos
echo 3. Si los puertos están ocupados, detén los servicios que los usen
echo 4. Ejecuta: run-windows.bat
echo.
echo 💡 Para más ayuda, consulta WINDOWS_SETUP.md
echo.
pause 