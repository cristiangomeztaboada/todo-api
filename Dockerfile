# Usa una imagen base para el proxy
FROM google/cloud-sdk:latest AS cloud_sql_proxy

# Usa una imagen base para tu aplicación
FROM node:18-alpine

# Instala dependencias y construye la aplicación
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Copia el proxy desde la imagen anterior
COPY --from=cloud_sql_proxy /usr/bin/cloud_sql_proxy /usr/bin/cloud_sql_proxy

# Define las variables de entorno sin los valores
ENV DB_HOST=127.0.0.1
ENV DB_USER=todo-user
ENV DB_PASSWORD=
ENV DB_NAME=todo-db

# Exponer el puerto de la aplicación
EXPOSE 8080

# Comando para iniciar el proxy y tu aplicación
CMD ["sh", "-c", "/usr/bin/cloud_sql_proxy -instances=woven-space-471718-k4:us-central1:todo-db-instance=tcp:5432 & node dist/main"]