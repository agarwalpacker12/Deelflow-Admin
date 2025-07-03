# Real Estate Wholesaling Platform

This is a monorepo for the Real Estate Wholesaling Platform, encompassing both the frontend (React.js) and backend (Laravel) applications with a unified development server architecture.

## Project Overview

The platform aims to streamline the real estate wholesaling process through AI-assisted lead management, a marketplace for property listings, transaction automation, and predictive analytics for deal assessment.

Refer to `docs/dealflow_mvp_srs.md` for detailed Software Requirements Specifications.

## Repository Structure

-   `/backend`: Contains the Laravel backend application with Vite integration
-   `/frontend`: Contains the React.js frontend application
-   `/docs`: Contains project documentation, including the SRS
-   `/.github`: Contains GitHub-specific files like workflows and issue templates

## Quick Start

### Option 1: One-Command Startup (Recommended)

```bash
./start-dev.sh
```

This script will:
- Install dependencies if needed
- Start both frontend and backend servers
- Set up the unified development environment

### Option 2: Manual Setup

```bash
# Install dependencies
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# Start development servers
cd backend && npm run dev:full
```

## Development Architecture

This project uses a **unified server architecture** where:

- **Backend Vite Server** (Port 5174): Main entry point
  - Handles Laravel API routes (`/api/*`)
  - Proxies all other requests to the frontend
  - Compiles Laravel assets (CSS/JS)

- **Frontend Vite Server** (Port 5173): React development server
  - Serves the React application
  - Provides hot module replacement

### Access Points

- **Main Application**: http://localhost:5174 (Recommended)
- **Direct Frontend**: http://localhost:5173 (For frontend-only development)

## Key Features

- **Single Entry Point**: Access your entire application through one URL
- **Hot Reloading**: Both frontend and backend support live reloading
- **API Integration**: Seamless communication between React and Laravel
- **Production-Like Setup**: Mimics production deployment architecture

## Documentation

- [Detailed Setup Instructions](SETUP_INSTRUCTIONS.md)
- [API Documentation](docs/api-documentation.md)
- [Software Requirements](docs/dealflow_mvp_srs.md)

## Technology Stack

- **Frontend**: React.js, Vite, TailwindCSS, Redux Toolkit
- **Backend**: Laravel, Vite, PHP
- **Development**: Unified Vite proxy architecture

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test using `./start-dev.sh`
5. Submit a pull request

## License

(License information to be added)
