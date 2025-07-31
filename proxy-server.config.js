import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
        host: '0.0.0.0',
        cors: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        middlewares: [
            // Custom middleware to handle manifest.json and prevent loops
            (req, res, next) => {
                // Handle manifest.json requests locally to prevent CORS issues
                if (req.url === '/manifest.json') {
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Cache-Control', 'no-cache');
                    res.end(JSON.stringify({
                        short_name: "DealFlow",
                        name: "DealFlow - AI Real Estate Wholesaling Platform",
                        start_url: "/",
                        display: "standalone",
                        theme_color: "#000000",
                        background_color: "#ffffff",
                        icons: []
                    }));
                    return;
                }
                
                // Prevent proxy loops by checking for proxy headers
                if (req.headers['x-forwarded-for'] && req.url !== '/') {
                    console.warn('Potential proxy loop detected for:', req.url);
                    res.statusCode = 200;
                    res.end('Proxy loop prevention');
                    return;
                }
                
                next();
            }
        ],
        proxy: {
            // Proxy API requests to the Laravel backend
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,
                ws: false, // Disable WebSocket for API routes
                configure: (proxy, options) => {
                    proxy.on('error', (err, req, res) => {
                        console.log('API Proxy error:', err.message);
                        if (!res.headersSent) {
                            res.writeHead(503, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Backend service unavailable' }));
                        }
                    });
                }
            },
            // Proxy Sanctum requests to the Laravel backend
            '/sanctum': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,
                ws: false, // Disable WebSocket for Sanctum routes
                configure: (proxy, options) => {
                    proxy.on('error', (err, req, res) => {
                        console.log('Sanctum Proxy error:', err.message);
                        if (!res.headersSent) {
                            res.writeHead(503, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Auth service unavailable' }));
                        }
                    });
                }
            },
            // Proxy frontend assets and pages (but exclude problematic paths)
            '^(?!/api|/sanctum|/@vite|/__vite_ping|/resources|/build|/manifest\\.json|/node_modules).*': {
                target: 'http://localhost:5173',
                changeOrigin: true,
                secure: false,
                ws: false, // Disable WebSocket to prevent connection issues
                configure: (proxy, options) => {
                    proxy.on('error', (err, req, res) => {
                        console.log('Frontend Proxy error:', err.message);
                        if (!res.headersSent) {
                            res.writeHead(503, { 'Content-Type': 'text/html' });
                            res.end('<html><body><h1>Frontend service unavailable</h1><p>Please ensure the frontend server is running on port 5173</p></body></html>');
                        }
                    });
                    
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        // Add headers to prevent loops
                        proxyReq.setHeader('X-Forwarded-For', req.connection.remoteAddress);
                        proxyReq.setHeader('X-Proxy-Source', 'dealflow-proxy');
                    });
                }
            }
        }
    }
});
