# Etapa 1: Construir la aplicación
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Copiar el proxy de Cloud SQL
FROM google/cloud-sdk:latest AS cloud_sql_proxy

# Etapa 3: Ejecutar la aplicación
FROM node:18-alpine
WORKDIR /app

# Copia los archivos de construcción de la Etapa 1
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Copia el proxy de la Etapa 2
COPY --from=cloud_sql_proxy /usr/bin/cloud_sql_proxy /usr/bin/cloud_sql_proxy

# No incluyas credenciales aquí
ENV DB_HOST=127.0.0.1
ENV DB_USER=
ENV DB_PASSWORD=
ENV DB_NAME=

# Exponer el puerto de la aplicación
EXPOSE 8080

# El comando para iniciar el proxy y tu aplicación
CMD ["sh", "-c", "/usr/bin/cloud_sql_proxy -instances=woven-space-471718-k4:us-central1:todo-db-instance=tcp:5432 & node dist/main"]