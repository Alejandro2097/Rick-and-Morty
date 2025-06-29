#!/bin/bash

echo "🚀 Setting up Fullstack Application with Colima..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if Colima is installed
if ! command -v colima &> /dev/null; then
    echo "❌ Colima is not installed. Please install Colima first:"
    echo "   brew install colima"
    exit 1
fi

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not available. Please install Docker Desktop or ensure Colima is properly configured."
    exit 1
fi

echo "✅ Colima and Docker are available"

# Start Colima if not running
if ! colima status &> /dev/null; then
    echo "🐳 Starting Colima..."
    colima start
else
    echo "✅ Colima is already running"
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Copy environment files
echo "📋 Setting up environment files..."

if [ ! -f "frontend/.env" ]; then
    cp frontend/env.example frontend/.env
    echo "✅ Created frontend/.env"
fi

if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    echo "✅ Created backend/.env"
fi

# Start Docker services with Colima
echo "🐳 Starting Docker services with Colima..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 15

# Check if services are running
echo "🔍 Checking service status..."
if ! docker-compose ps | grep -q "Up"; then
    echo "⚠️  Some services might not be running. Check with: docker-compose ps"
fi

# Setup database
echo "🗄️ Setting up database..."
cd backend
npm run db:generate
npm run db:push
cd ..

echo "✅ Setup completed successfully!"
echo ""
echo "🎉 Your fullstack application is ready!"
echo ""
echo "📋 Next steps:"
echo "1. Update environment variables in frontend/.env and backend/.env"
echo "2. Start the development servers: npm run dev"
echo "3. Frontend will be available at: http://localhost:5173"
echo "4. Backend GraphQL will be available at: http://localhost:4000/graphql"
echo "5. Database will be available at: localhost:5432"
echo "6. Redis will be available at: localhost:6379"
echo ""
echo "🔧 Available commands:"
echo "- npm run dev: Start both frontend and backend"
echo "- npm run dev:frontend: Start only frontend"
echo "- npm run dev:backend: Start only backend"
echo "- npm run test: Run all tests"
echo "- npm run build: Build for production"
echo "- docker-compose ps: Check service status"
echo "- docker-compose logs: View service logs"
echo "- colima stop: Stop Colima when done"
echo ""
echo "📚 Check the README.md for more information." 