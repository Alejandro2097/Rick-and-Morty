FROM node:20-alpine

# Instalar dependencias del sistema necesarias para Prisma
RUN apk add --no-cache \
    openssl \
    libssl3 \
    postgresql-client \
    curl

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm install

# Generar cliente de Prisma
RUN npx prisma generate

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 4000

# Comando por defecto
CMD ["npm", "run", "dev"] 