# Etapa de construcción
FROM node:18.13.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env  
RUN npm run build


# Etapa de producción
FROM node:18.13.0-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env .env
RUN npm install --production

EXPOSE 3000
CMD ["node", "dist/main"]