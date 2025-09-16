# Dockerfile
# Stage 1: Build the application
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Configuración de Cloud SQL Proxy
RUN apk add --no-cache curl
RUN curl -o /usr/bin/cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 && chmod +x /usr/bin/cloud_sql_proxy
ENV DB_HOST=127.0.0.1
ENV DB_USER=todo-user
ENV DB_PASSWORD=Cristian1986!
ENV DB_NAME=todo-db

# Expose the port your app runs on
EXPOSE 8080

CMD ["sh", "-c", "/usr/bin/cloud_sql_proxy -instances=woven-space-471718-k4:us-central1:todo-db-instance=tcp:5432 & node dist/main"]