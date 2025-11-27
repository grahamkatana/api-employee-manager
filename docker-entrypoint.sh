#!/bin/sh
set -e

echo "🚀 Starting Employee Manager API..."

# Function to wait for database
wait_for_db() {
    echo "⏳ Waiting for database to be ready..."
    
    # Maximum wait time (seconds)
    max_attempts=30
    attempt=0
    
    until node -e "
        const mysql = require('mysql2/promise');
        mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT || 3306
        }).then(conn => {
            console.log('Database connection successful');
            conn.end();
            process.exit(0);
        }).catch(err => {
            console.error('Database not ready:', err.message);
            process.exit(1);
        });
    " 2>/dev/null
    do
        attempt=$((attempt + 1))
        if [ $attempt -ge $max_attempts ]; then
            echo "❌ Database connection failed after $max_attempts attempts"
            exit 1
        fi
        echo "⏳ Attempt $attempt/$max_attempts - Waiting for database..."
        sleep 2
    done
    
    echo "✅ Database is ready!"
}

# Function to create database if it doesn't exist
create_database() {
    echo "🔍 Checking if database exists..."
    
    node -e "
        const mysql = require('mysql2/promise');
        (async () => {
            const conn = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT || 3306
            });
            
            await conn.query(\`CREATE DATABASE IF NOT EXISTS \\\`\${process.env.DB_NAME}\\\`\`);
            console.log('✅ Database ensured');
            await conn.end();
        })().catch(err => {
            console.error('❌ Database creation error:', err.message);
            process.exit(1);
        });
    "
}

# Function to run migrations
run_migrations() {
    echo "🔄 Running database migrations..."
    
    if npx sequelize-cli db:migrate; then
        echo "✅ Migrations completed successfully"
    else
        echo "❌ Migration failed"
        exit 1
    fi
}

# Main execution
echo "📋 Environment: ${NODE_ENV}"
echo "📋 Database Host: ${DB_HOST}"
echo "📋 Database Name: ${DB_NAME}"

# Wait for database to be ready
wait_for_db

# Create database if needed
create_database

# Run migrations
run_migrations

# Start the application
echo "🎯 Starting application on port ${PORT}..."
exec npm start
