#!/bin/bash

# Unified Development Server Startup Script
# This script starts both frontend and backend Vite servers

echo "🚀 Starting Dealflow Development Servers..."
echo ""

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   Make sure both 'backend' and 'frontend' directories exist"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    echo "   Please install Node.js and npm first"
    exit 1
fi

# Install dependencies if node_modules don't exist
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

# Load environment variables and get the port
cd backend
if [ -f .env ]; then
    APP_PORT=$(grep "^APP_PORT=" .env | cut -d '=' -f2)
    if [ -z "$APP_PORT" ]; then
        APP_PORT=8000
    fi
else
    APP_PORT=8000
fi

echo ""
echo "🎯 Starting servers..."
echo "   Frontend: http://localhost:5173 (React Vite server)"
echo "   Backend API: http://localhost:$APP_PORT (Laravel application server)"
echo "   Backend Assets: http://localhost:5174 (Laravel Vite server)"
echo ""
echo "🌐 Access your application at: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Start the development servers
npx concurrently \
  "php artisan serve --port=$APP_PORT --host=0.0.0.0" \
  "npm run dev:frontend" \
  "npm run dev:backend" \
  --names "laravel,frontend,vite" \
  --prefix-colors "red,blue,green"
