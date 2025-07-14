# Railway Deployment Guide

This guide explains how to deploy the Dealflow Laravel backend to Railway.

## Prerequisites

1. Railway account (https://railway.app)
2. GitHub repository connected to Railway
3. PostgreSQL database addon

## Deployment Steps

### 1. Connect Repository to Railway

1. Go to Railway dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Set root directory to `backend`

### 2. Add PostgreSQL Database

1. In your Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically provision a PostgreSQL database

### 3. Configure Environment Variables

In Railway dashboard, go to your service settings and add these environment variables:

```env
APP_NAME="Dealflow API"
APP_ENV=production
APP_KEY=base64:YOUR_GENERATED_KEY_HERE
APP_DEBUG=false
APP_URL=https://your-railway-app.railway.app

LOG_LEVEL=error

# Database (Railway will auto-populate these)
DB_CONNECTION=pgsql
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_DATABASE=${{Postgres.PGDATABASE}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}

# CORS Configuration
CORS_ALLOWED_ORIGINS="https://your-frontend-app.onrender.com"

# Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS="your-frontend-app.onrender.com"

# Disable mock data in production
MOCK_DATA_ENABLED=false
```

### 4. Generate Application Key

Railway will automatically run `php artisan key:generate` during deployment.

### 5. Database Migrations

Railway will automatically run migrations during deployment via the `post-install-cmd` script.

## Important Notes

### Database Connection
- Railway automatically provides PostgreSQL connection variables
- Use Railway's variable references: `${{Postgres.PGHOST}}`, etc.

### CORS Configuration
- Update `CORS_ALLOWED_ORIGINS` with your actual Render.com frontend URL
- Update `SANCTUM_STATEFUL_DOMAINS` with your frontend domain

### Environment Variables to Update
1. `APP_URL` - Your Railway app URL
2. `CORS_ALLOWED_ORIGINS` - Your Render.com frontend URL
3. `SANCTUM_STATEFUL_DOMAINS` - Your frontend domain

### Automatic Deployment
- Railway will automatically deploy when you push to your `develop` branch
- No CI/CD configuration files needed

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Ensure PostgreSQL addon is added to your project
   - Verify database environment variables are correctly set

2. **CORS Errors**
   - Update `CORS_ALLOWED_ORIGINS` with your frontend URL
   - Ensure frontend is making requests to correct backend URL

3. **Key Generation**
   - If app key is missing, Railway should auto-generate it
   - You can manually set `APP_KEY` in environment variables

### Logs
- Check Railway logs in the dashboard for deployment issues
- Use `LOG_LEVEL=debug` temporarily for more detailed logs

## Frontend Integration

Update your frontend's API configuration to point to your Railway backend URL:

```javascript
// In your frontend environment variables
REACT_APP_API_URL=https://your-railway-app.railway.app/api
```

## Health Check

Railway provides a health check endpoint at `/up` (configured in `bootstrap/app.php`).
