# Rick and Morty App - Docker Setup for Windows
Write-Host "🐳 Iniciando Rick and Morty App con Docker en Windows..." -ForegroundColor Cyan
Write-Host ""

# Verificar si Docker está ejecutándose
try {
    docker info | Out-Null
    Write-Host "✅ Docker está ejecutándose" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker no está ejecutándose. Por favor, inicia Docker Desktop primero." -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host ""

# Detener contenedores existentes
Write-Host "🛑 Deteniendo contenedores existentes..." -ForegroundColor Yellow
docker-compose down

Write-Host ""
Write-Host "🚀 Iniciando servicios..." -ForegroundColor Green
Write-Host ""

# Ejecutar todo con Docker Compose
docker-compose up -d

Write-Host ""
Write-Host "⏳ Esperando a que los servicios estén listos..." -ForegroundColor Yellow
Write-Host ""

# Esperar a que los servicios estén listos
Start-Sleep -Seconds 15

# Verificar estado de los servicios
Write-Host "📊 Estado de los servicios:" -ForegroundColor Cyan
docker-compose ps

Write-Host ""
Write-Host "🎉 ¡Aplicación iniciada!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Blue
Write-Host "🔧 Backend: http://localhost:4000" -ForegroundColor Blue
Write-Host "📚 GraphQL Playground: http://localhost:4000/graphql" -ForegroundColor Blue
Write-Host ""
Write-Host "💡 Comandos útiles:" -ForegroundColor Yellow
Write-Host "   Ver logs: docker-compose logs -f" -ForegroundColor Gray
Write-Host "   Ver logs del backend: docker-compose logs -f backend" -ForegroundColor Gray
Write-Host "   Detener: docker-compose down" -ForegroundColor Gray
Write-Host "   Repoblar BD: docker-compose run --rm backend npx prisma db seed" -ForegroundColor Gray
Write-Host ""

Read-Host "Presiona Enter para salir" 