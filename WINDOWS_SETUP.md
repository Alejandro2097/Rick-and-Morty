# 🪟 Guía de Configuración para Windows

## 🚨 Problemas Comunes en Windows y Soluciones

### 1. **Docker Desktop no está ejecutándose**
```cmd
# Verificar si Docker está ejecutándose
docker --version
docker-compose --version

# Si no está instalado, descargar Docker Desktop desde:
# https://www.docker.com/products/docker-desktop/
```

### 2. **Puertos ocupados**
```cmd
# Verificar puertos en uso
netstat -ano | findstr :4000
netstat -ano | findstr :5173
netstat -ano | findstr :5432

# Si están ocupados, detener los procesos o cambiar puertos
```

### 3. **Problemas de permisos**
```cmd
# Ejecutar PowerShell como administrador
# O ejecutar CMD como administrador
```

## 🛠️ Configuración Paso a Paso

### Paso 1: Verificar Prerrequisitos
```cmd
# Verificar Node.js
node --version
npm --version

# Verificar Docker
docker --version
docker-compose --version
```

### Paso 2: Configurar Variables de Entorno
```cmd
# En el directorio raíz del proyecto
copy backend\env.example backend\.env
copy frontend\env.example frontend\.env
```

### Paso 3: Ejecutar con Docker (Recomendado)
```cmd
# Opción 1: Script automático
run-windows.bat

# Opción 2: PowerShell
.\run-windows.ps1

# Opción 3: Manual
docker-compose up -d
```

### Paso 4: Verificar Servicios
```cmd
# Ver estado de contenedores
docker-compose ps

# Ver logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🔧 Configuración Manual (Sin Docker)

### Paso 1: Instalar PostgreSQL
```cmd
# Descargar PostgreSQL desde: https://www.postgresql.org/download/windows/
# O usar Chocolatey:
choco install postgresql
```

### Paso 2: Configurar Base de Datos
```cmd
# Crear base de datos
createdb -U postgres fullstack_app

# O usar pgAdmin para crear la base de datos
```

### Paso 3: Configurar Backend
```cmd
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Paso 4: Configurar Frontend
```cmd
cd frontend
npm install
npm run dev
```

## 🐛 Solución de Problemas

### Problema: "Los personajes no se cargan"

#### 1. Verificar Backend
```cmd
# Verificar que el backend esté ejecutándose
curl http://localhost:4000/health

# Probar API GraphQL
curl -X POST http://localhost:4000/graphql -H "Content-Type: application/json" -d "{\"query\":\"{ characters { id name } }\"}"
```

#### 2. Verificar Base de Datos
```cmd
# Conectar a PostgreSQL
psql -U postgres -d fullstack_app

# Verificar datos
SELECT COUNT(*) FROM characters;
SELECT name, species FROM characters LIMIT 5;
```

#### 3. Verificar Frontend
```cmd
# Abrir navegador en http://localhost:5173
# Abrir herramientas de desarrollador (F12)
# Revisar consola para errores
# Revisar pestaña Network para peticiones GraphQL
```

### Problema: "Error de CORS"

#### Solución 1: Configurar CORS en Backend
```javascript
// En backend/src/index.ts
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
```

#### Solución 2: Usar Proxy en Vite
```javascript
// En frontend/vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/graphql': 'http://localhost:4000'
    }
  }
});
```

### Problema: "Error de Conexión a Base de Datos"

#### Verificar Variables de Entorno
```env
# En backend/.env
DATABASE_URL="postgresql://postgres:tu_password@localhost:5432/fullstack_app"
```

#### Verificar PostgreSQL
```cmd
# Verificar que PostgreSQL esté ejecutándose
net start postgresql-x64-14

# O verificar servicios
services.msc
```

## 📊 Verificación Final

### URLs de Acceso:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000
- **GraphQL Playground**: http://localhost:4000/graphql
- **Prisma Studio**: http://localhost:5555

### Comandos de Verificación:
```cmd
# Verificar todos los servicios
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Repoblar base de datos
docker-compose exec backend npx prisma db seed

# Verificar datos
docker-compose exec postgres psql -U postgres -d fullstack_app -c "SELECT COUNT(*) FROM characters;"
```

## 🆘 Si Nada Funciona

### Opción 1: Reset Completo
```cmd
# Detener todo
docker-compose down -v

# Eliminar volúmenes
docker volume prune

# Reiniciar desde cero
docker-compose up -d
```

### Opción 2: Configuración Manual Completa
```cmd
# Seguir la guía de configuración manual paso a paso
# Ver sección "Configuración Manual (Sin Docker)"
```

### Opción 3: Verificar Logs Detallados
```cmd
# Ver logs del backend
docker-compose logs backend

# Ver logs del frontend
docker-compose logs frontend

# Ver logs de la base de datos
docker-compose logs postgres
``` 