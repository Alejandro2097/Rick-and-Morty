-- Script de inicialización para PostgreSQL
-- Se ejecuta automáticamente cuando el contenedor de PostgreSQL se inicia por primera vez

-- Crear la base de datos si no existe
SELECT 'CREATE DATABASE fullstack_app'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'fullstack_app')\gexec

-- Conectar a la base de datos
\c fullstack_app;

-- Crear extensiones útiles
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Configurar timezone
SET timezone = 'UTC';

-- Crear usuario específico para la aplicación (opcional)
-- CREATE USER app_user WITH PASSWORD 'app_password';
-- GRANT ALL PRIVILEGES ON DATABASE fullstack_app TO app_user;

-- Configurar parámetros de rendimiento
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET max_connections = 100;
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';

-- Aplicar cambios
SELECT pg_reload_conf();

-- Log de inicialización
SELECT 'PostgreSQL inicializado correctamente para Rick and Morty App' as status; 