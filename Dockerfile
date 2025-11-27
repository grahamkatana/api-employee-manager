FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Create storage directories
RUN mkdir -p /app/storage /app/uploads && \
    chmod 777 /app/storage /app/uploads

COPY package*.json ./
RUN npm ci --only=production

# Copy built files
COPY --from=builder /app/dist ./dist

# Copy src directory (has config, db/migrations, db/seeders, models)
COPY src ./src

# Copy sequelize config and startup script
COPY .sequelizerc ./
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["./docker-entrypoint.sh"]
