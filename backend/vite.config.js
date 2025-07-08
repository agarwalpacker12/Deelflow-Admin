import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        port: 3000,
        host: '0.0.0.0',
        hmr: {
            port: 5175, // Use a different port for backend HMR to avoid conflicts
            host: '0.0.0.0', // Use 0.0.0.0 for Codespaces compatibility
        },
        cors: true, // Enable CORS for all origins in development
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        ws: true, // Enable WebSocket support
        proxy: {
            // Proxy API requests to the Laravel backend
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,
                ws: true,
                configure: (proxy, options) => {
                    proxy.on('error', (err, req, res) => {
                        console.log('API Proxy error:', err);
                    });
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        console.log('Proxying API request:', req.method, req.url);
                    });
                }
            },
            // Proxy frontend WebSocket connections (HMR)
            '/frontend-ws': {
                target: 'ws://localhost:5174',
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: (path) => path.replace(/^\/frontend-ws/, ''),
                configure: (proxy, options) => {
                    proxy.on('error', (err, req, res) => {
                        console.log('Frontend WebSocket Proxy error:', err);
                    });
                    proxy.on('open', (proxySocket) => {
                        console.log('Frontend WebSocket proxy connection opened');
                    });
                    proxy.on('close', (res, socket, head) => {
                        console.log('Frontend WebSocket proxy connection closed');
                    });
                }
            },
            // Proxy all other requests to the frontend React application
            // Exclude Vite HMR, WebSocket, and Laravel-specific paths
            '^(?!/api|/@vite|/__vite_ping|/resources|/build|/frontend-ws).*': {
                target: 'http://localhost:5173',
                changeOrigin: true,
                secure: false,
                ws: true,
                configure: (proxy, options) => {
                    proxy.on('error', (err, req, res) => {
                        console.log('Frontend Proxy error:', err);
                    });
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        console.log('Proxying frontend request:', req.method, req.url);
                    });
                }
            }
        }
    }
});
